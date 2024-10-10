const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const appMessage = document.getElementById("app-message")

let myInterval;

function stopTimer() {
    stopButton.classList.add("hidden");
    startButton.classList.remove("hidden");
    appMessage.textContent = "Press start for new session";

    clearInterval(myInterval);
    beep(500, 440, 0.5);
}

function startTimer() {
    startButton.classList.add("hidden");
    stopButton.classList.remove("hidden");
    appMessage.textContent = "Focus...";
    beep(500, 350, 0.5);

    const sessionAmount = Number.parseInt(minutesSpan.textContent);
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
        if (totalSeconds <= 0) {
            clearInterval(myInterval);
            secondsSpan.textContent = "00";
            minutesSpan.textContent = "00";
            beep(500, 440, 0.5);
            return;
        }

        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds / 60);
        let secondsLeft = totalSeconds % 60;

        // update timer in html
        secondsSpan.textContent = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
        minutesSpan.textContent = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
    }

    // start js timer
    myInterval = setInterval(updateSeconds, 1000);
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
    }, duration); //beep time in ms
}
