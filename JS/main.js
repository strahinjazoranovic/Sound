let mic; // Microphone input
let amplitude; // Amplitude analyzer

function setup() {
    createCanvas(1500, 825);

    // Initialize the microphone input
    mic = new p5.AudioIn();
    mic.start(); // Start capturing audio

    // Create an amplitude analyzer and link it to the mic
    amplitude = new p5.Amplitude();
    amplitude.setInput(mic);

    noStroke();
    textSize(16); // For debugging text
    fill(255);
}

function draw() {
    background(255)// background

    // Get the current audio level (amplitude)
    let level = amplitude.getLevel();

    // Map the amplitude level to a size range for the circle
    let size = map(level, 0, 0.3, 50, 600); // Adjust 0.1 if needed to better suit your mic sensitivity

    // Debug: Display the amplitude level on the canvas
    text(`Amplitude Level: ${level.toFixed(4)}`, 10, 30);

    // Draw a circle that reacts to the audio level
    let col = map(level, 0, 0.1, 100, 255); // Adjust 0.1 as above
    fill(col, 100, 255 - col);
    ellipse(width / 2, height / 2, size, size);
}
