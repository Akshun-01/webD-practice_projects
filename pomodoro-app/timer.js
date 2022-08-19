//clockTimer
const radius = clockTimer.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

clockTimer.style.strokeDasharray = circumference;
clockTimer.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent/100) * circumference;
    circle.style.strokeDashoffset = offset;
}