'use strict';

let root = document.querySelector(':root');
let themeColor = "#f26365";
// 
let timeLeft = document.querySelector('.time-left');
let pauseBtn = document.querySelector('.pause-btn');
let clockTimer = document.querySelector('.clock-timer');
//time-modes 
let pomodoroModeBtn = document.querySelector('li.pomodoro-mode-btn');
let shortBreakModeBtn = document.querySelector('li.short-break-mode-btn');
let longBreakModeBtn = document.querySelector('li.long-break-mode-btn');
// buttons to toggle settignsPanel
let settingsBtn = document.querySelector('.settings-btn');
let settingsContainer = document.querySelector('.settings-container');
let crossBtn = document.querySelector('.cross-btn');
// inside settings panel //
// let fontBtns = document.querySelectorAll('.font-mode');
let font1 = document.querySelector('.font-1');
let font2 = document.querySelector('.font-2');
let font3 = document.querySelector('.font-3');
let fontActive = document.querySelector('.circle');
// let colorBtns = document.querySelectorAll('.color-mode');
let color1 = document.querySelector('.color-1');
let color2 = document.querySelector('.color-2');
let color3 = document.querySelector('.color-3');
let tick = document.querySelector('.tick');
//timer-settigns for different modes 
let pomodoroTime = document.querySelector('.pomodoro-time').value;
let shortBreakTime = document.querySelector('.short-break-time').value;
let longBreakTime = document.querySelector('.long-break-time').value;
//apply button 
let applyBtn = document.querySelector('.apply-btn');
// for functioning 
let time;
let multip;
////////////////////////////////////////////////////////////////////////
var pomodoroSetTime = `${25}:00`, shortBreakSetTime = `0${5}:00`, longBreakSetTime = `${15}:00`;
pomodoroModeBtn.classList.add('selected-mode');
////////////////////////////////////////////////////////////////////////
settingsBtn.addEventListener('click', () => {
    settingsContainer.classList.toggle('active');
})
crossBtn.addEventListener('click', () => {
    settingsContainer.classList.toggle('active');
})

// selecting font 
font1.addEventListener('click', () => {
    root.style.setProperty('--theme-font-family', 'Lato, sans-serif');
    font1.classList.add('active-font');
    font2.classList.remove('active-font');
    font3.classList.remove('active-font');
})
font2.addEventListener('click', () => {
    root.style.setProperty('--theme-font-family', 'serif');
    font1.classList.remove('active-font');
    font2.classList.add('active-font');
    font3.classList.remove('active-font');
})
font3.addEventListener('click', () => {
    root.style.setProperty('--theme-font-family', 'cursive');
    font1.classList.remove('active-font');
    font2.classList.remove('active-font');
    font3.classList.add('active-font');
})

// colorBtns.forEach((element,i) => {
//     element.addEventListener('click', () => {
//         colorBtns[i].classList.add('tick-active');
//         console.log(colorBtns[i]);
//     })
// })
var modes = document.querySelectorAll(".color-mode");
modes.forEach((element) => {
element.addEventListener('click', (e) => {

    modes.forEach((element) => {
        element.classList.remove('active');
    });  
    e.target.classList.add('active');
});

});
// selecting color :error => cant add tick //
color1.addEventListener('click', () => {
    root.style.setProperty('--theme-color', '#f26365');
    themeColor = "#f26365";
})
color2.addEventListener('click', () => {
    root.style.setProperty('--theme-color', '#75F2F6');
    themeColor = "#75F2F6";
})
color3.addEventListener('click', () => {
    root.style.setProperty('--theme-color', '#DB81FC');
    themeColor = "#DB81FC";
})
////////////////////////////////////////////////////////////////
// changing mode //
let mode = 1;
pomodoroModeBtn.addEventListener('click', () => {
    pomodoroModeBtn.classList.add('selected-mode');
    shortBreakModeBtn.classList.remove('selected-mode');
    longBreakModeBtn.classList.remove('selected-mode');
    timeLeft.innerHTML = pomodoroSetTime;
    mode = 1;
    //
    clearInterval(progressChecker);
    pauseBtn.innerHTML = "PLAY";
    clockTimer.style.background = "#f26365";

})
shortBreakModeBtn.addEventListener('click', () => {
    pomodoroModeBtn.classList.remove('selected-mode');
    shortBreakModeBtn.classList.add('selected-mode');
    longBreakModeBtn.classList.remove('selected-mode');
    timeLeft.innerHTML = shortBreakSetTime;
    mode = 2;
    //
    clearInterval(progressChecker);
    pauseBtn.innerHTML = "PLAY";
    clockTimer.style.background = "#f26365";
})
longBreakModeBtn.addEventListener('click', () => {
    pomodoroModeBtn.classList.remove('selected-mode');
    shortBreakModeBtn.classList.remove('selected-mode');
    longBreakModeBtn.classList.add('selected-mode');
    timeLeft.innerHTML = longBreakSetTime;
    mode = 3;
    //
    clearInterval(progressChecker);
    pauseBtn.innerHTML = "PLAY";
    clockTimer.style.background = "#f26365";
})
////////////////////////////////////////////////////////////////
applyBtn.addEventListener('click', () => {
    let pomodoroTime = document.querySelector('.pomodoro-time').value;
    if (pomodoroTime < 10) { pomodoroSetTime = `0${pomodoroTime}:00`; }
    else { pomodoroSetTime = `${pomodoroTime}:00`; }
    //check on which on which mode we are to change according//
    if (mode === 1) { timeLeft.innerHTML = pomodoroSetTime; }
    settingsContainer.classList.toggle('active');

    let shortBreakTime = document.querySelector('.short-break-time').value;
    if (shortBreakTime < 10) { shortBreakSetTime = `0${shortBreakTime}:00`; }
    else { shortBreakSetTime = `${shortBreakTime}:00`; }

    if (mode === 2) { timeLeft.innerHTML = shortBreakSetTime; }
    settingsContainer.classList.toggle('active');

    let longBreakTime = document.querySelector('.long-break-time').value;
    if (longBreakTime < 10) { longBreakSetTime = `0${longBreakTime}:00`; }
    else { longBreakSetTime = `${longBreakTime}:00`; }

    if (mode === 3) { timeLeft.innerHTML = longBreakSetTime; }
    settingsContainer.classList.toggle('active');
})
//////////////////////////////////////////////////////////////

let progressChecker;

pauseBtn.addEventListener('click', () => {
    time = (Number(timeLeft.innerHTML.slice(0, -3)) * 60);
    multip = parseFloat(360 / time);
    if (pauseBtn.innerHTML === "PLAY") {
        // code for timer//
        progressChecker = setInterval(() => {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (minutes >= 0 && seconds >= 0) {
                seconds = seconds < 10 ? '0' + seconds : seconds;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                timeLeft.innerHTML = `${minutes}:${seconds}`;
                time--;

                console.log(themeColor);
                clockTimer.style.background = `conic-gradient(
                    ${themeColor} ${time * multip}deg,
                    #0d112d ${time * multip}deg
                )`;
            }

        }, 1000)
        pauseBtn.innerHTML = "PAUSE";
    }
    else {
        //code to stop timer//
        clearInterval(progressChecker);
        pauseBtn.innerHTML = "PLAY";
    }


})

