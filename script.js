const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const appMessage = document.getElementById("app-message");

let sessionInterval;
const initialMinutes = 25; // Set your default value here in one place

// Set initial values dynamically when the page loads
window.onload = () => {
    resetTimerDisplay(initialMinutes, 0);
}

function stopTimer() {
    stopButton.classList.add("hidden");
    startButton.classList.remove("hidden");
    appMessage.textContent = "Press start for a new session";

    clearInterval(sessionInterval);
    beep(500, 440, 0.5);
}

function startTimer() {
    startButton.classList.add("hidden");
    stopButton.classList.remove("hidden");
    appMessage.textContent = "Focus...";
    beep(500, 350, 0.5);

    // Reset the timer using the initial value
    resetTimerDisplay(initialMinutes, 0);

    let totalSeconds = initialMinutes * 60;

    const updateSeconds = () => {
        if (totalSeconds <= 0) {
            clearInterval(sessionInterval);
            resetTimerDisplay(0, 0);
            beep(500, 440, 0.5);
            return;
        }

        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds / 60);
        let secondsLeft = totalSeconds % 60;

        // Update timer in HTML
        resetTimerDisplay(minutesLeft, secondsLeft);
    }

    // Start JS timer
    sessionInterval = setInterval(updateSeconds, 1000);
}

function resetTimerDisplay(minutes, seconds) {
    // Function to update the display values for the timer
    minutesSpan.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsSpan.textContent = seconds < 10 ? "0" + seconds : seconds;
}

function beep(duration, frequency, volume) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, duration); // beep time in ms
}
