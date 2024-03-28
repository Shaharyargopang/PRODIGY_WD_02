let startTime;
let animationFrameId;
let lapTimes = [];
let running = false;

document.getElementById("startBtn").addEventListener("click", startStopwatch);
document.getElementById("pauseBtn").addEventListener("click", pauseStopwatch);
document.getElementById("resetBtn").addEventListener("click", resetStopwatch);
document.getElementById("lapBtn").addEventListener("click", recordLap);

function startStopwatch() {
    if (!running) {
        startTime = Date.now();
        updateStopwatch();
        running = true;
    }
}

function updateStopwatch() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.querySelector('.stopwatch').textContent = formattedTime;
    animationFrameId = requestAnimationFrame(updateStopwatch);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);
    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(millisecondsFormatted)}`;
}

function padTime(time) {
    return time < 10 ? '0' + time : time;
}

function pauseStopwatch() {
    cancelAnimationFrame(animationFrameId);
    running = false;
}

function resetStopwatch() {
    cancelAnimationFrame(animationFrameId);
    document.querySelector('.stopwatch').textContent = '00:00:00';
    lapTimes = [];
    document.querySelector('.lap-times').textContent = 'Lap Times:';
    running = false;
}

function recordLap() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    lapTimes.push(formattedTime);
    const lapTimesDisplay = lapTimes.map((lap, index) => `<div>Lap ${index + 1}: ${lap}</div>`).join('');
    document.querySelector('.lap-times').innerHTML = lapTimesDisplay;
}
