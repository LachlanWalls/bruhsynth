let notes = document.querySelectorAll(".synth-note")
const context = new AudioContext()
while (!context) {
    context = new AudioContext()
}
let buffers = {}
let sources = {}

notes.forEach((note) => {
    window.fetch("http://bruhsynth.dynodel.com/sfx/bruh" + note.getAttribute("note") + ".wav")
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            buffers[note.getAttribute("note")] = audioBuffer
        })
})

notes.forEach((note) => {
    note.addEventListener("mousedown", (e) => {
        play(e.path[0].getAttribute("note"))
    })

    note.addEventListener("mouseup", (e) => {
        sources[e.path[0].getAttribute("note")].stop()
    })
})

function play(n) {
    const source = context.createBufferSource()
    source.buffer = buffers[n]
    source.connect(context.destination)
    source.start()

    sources[n] = source
}

window.onkeydown = function(e) {
    let keys = ["a", "s", "d", "f", "g", "h", "j", "w", "e", "t", "y", "u"]
    let notes = ["C", "D", "E", "F", "G", "A", "B", "Db", "Eb", "Gb", "Ab", "Bb"]

    play(notes[keys.indexOf(e.key)])
}