let mic;
let amplitude;
let audioStarted = false; // Track if audio has started

function setup() {
    createCanvas(1535, 825);
    noStroke();
    textSize(16); // Debug text size
    fill(255);

    // Suspend the AudioContext until user gesture (this is required by modern browsers)
    let audioContext = getAudioContext();
    audioContext.suspend();
}

function draw() {
    if (!audioStarted) {
        background(0); // Display instructions before audio starts
        fill(255);
        textAlign(CENTER, CENTER);
        text("Click anywhere to start audio", width / 2, height / 2);
        return; // Skip the rest of the draw loop until audio starts
    }

    background(255); // Clear background

    // Get the current amplitude level
    let level = amplitude.getLevel();

    // Map amplitude to size
    let size = map(level, 0, 0.2, 50, 600); // Adjust upper bound of 0.1 as needed

    // Display debug info
    fill(0);
    text(`Amplitude Level: ${level.toFixed(4)}`, 10, 30);

    // Map amplitude to color
    let col = map(level, 0, 0.1, 100, 255);
    fill(col, 100, 255 - col);

    // Draw circle reacting to audio level
    ellipse(width / 2, height / 2, size, size);
}

// Trigger audio input on the first mouse click
function mousePressed() {
    if (!audioStarted) {
        // Resume AudioContext after user interaction
        getAudioContext().resume().then(() => {
            audioStarted = true; // Set flag to true after resuming
            mic = new p5.AudioIn();
            mic.start(); // Start microphone input
            amplitude = new p5.Amplitude();
            amplitude.setInput(mic); // Connect amplitude analyzer to mic
        });
    }
}
