'use strict';

//
// Useful Fn
//
// forEach
const forEach = Array.prototype.forEach;

// milisecond to min:sec
function formatTime ( ms ) {
    const seconds = Math.ceil( ms / 1000 );
    const minutes = Math.floor( seconds / 60 );
    let mm = zeroPad.call( minutes, 2 );
    let _context = seconds % 60;
    let ss = ( _context, zeroPad).call(_context, 2);

    return mm + ':' + ss;
}

function zeroPad(length) {
    let out = String(this);
  
    while (out.length < length) {
      out = '0' + out;
    }
  
    return out;
}

//
// Notification
//
/*
const notiBtn = document.getElementById('notifications');
notiBtn.addEventListener('click', event => {
    // If notification checkbox is unchecked
    // do nothing
    if ( !event.target.checked) return
    
    // Check notification is allowed in the browser
    if ( !'Notification' in window) {
        alert('Your browser does not support notifications');
        return
    }

    // Check notification permission
    if ( Notification.permission === 'granted' ){
        event.target.checked = true;
        return;
    }

    // Ask for notification permission
    Notification.requestPermission()
    .then( result => {
        if ( result === 'granted') {
            event.target.checked = true;
        }
    });
});
*/
//
// Timer
//

const arc = document.getElementById('arc');

// Circumference of the Circle
const strokeLength = 2 * Math.PI * arc.r.baseVal.value;

// Pattern of dashes and gaps used to paint the outline of the shape
arc.style.strokeDasharray = strokeLength + ' ' + strokeLength;
arc.style.strokeDashoffset = strokeLength;

const timer = document.getElementById('timer');
let startTime;
let paused;
let pauseTime;
let duration;
let durationElement = document.getElementById('work-length');
let requestId;

function startTimer() {
    paused = false;

    startTime = performance.now();
    duration = parseInt( durationElement.textContent ) * 1000 * 60;
    requestId = requestAnimationFrame(tick)    ;
    document.body.style.backgroundColor = "#2fc97a";
}

function stopTimer() {
    paused = undefined;
    timer.textContent = 'START';
    arc.style.strokeDashoffset = strokeLength;
    cancelAnimationFrame(requestId);
    document.body.classList.remove('paused');
}

function pauseTimer() {
    paused = true;
    pauseTime = performance.now();
    cancelAnimationFrame(requestId);
    document.body.classList.add('paused');
}

function resumeTimer() {
    paused = false;
    startTime = performance.now() - (pauseTime - startTime);
    requestId = requestAnimationFrame(tick);
    document.body.classList.remove('paused');
}

function tick ( currentTime ) {
    // Remaining number of milliseconds on the clock
    const remaining = duration - ( currentTime - startTime);

    if( remaining <= 0 ) {
        timer.textContent = '00:00';
        arc.style.strokeDashoffset = 0;
        paused = undefined;
        // toggleMode();
        doneMode();
        return;
    }

    timer.textContent = formatTime(remaining);

    arc.style.strokeDashoffset = strokeLength * remaining / duration;

    // Schedule next tick
    requestId = requestAnimationFrame(tick);

}

const mode = document.getElementById('mode');
const workLength = document.getElementById('work-length');

function toggleMode() {
    if (mode.textContent === 'Work') {
      mode.textContent = 'Break';
      document.body.classList.add('break');
      durationElement = breakLength;
    } else {
      mode.textContent = 'Work';
      document.body.classList.remove('break');
      durationElement = workLength;
    }
    notify(mode.textContent, formatTime(parseInt(durationElement.textContent) * 1000 * 60));
    startTimer();
}

function doneMode() {
    stopTimer();
    document.body.style.backgroundColor = "#850a49";
}
////
//   Input
////

const svg = document.querySelector('svg');

svg.addEventListener('click', event => {
  switch (paused) {
    case undefined:
      startTimer();
      break;
    case true:
      resumeTimer();
      break;
    case false:
      pauseTimer();
      break;}

});

const incrementors = document.querySelectorAll('.incrementor');

forEach.call(incrementors, incrementor => {
  const value = incrementor.querySelector('.value');
  incrementor.querySelector('.plus').addEventListener('click', event => {
    value.textContent = parseInt(value.textContent) + 1;
  });
  incrementor.querySelector('.minus').addEventListener('click', event => {
    value.textContent = Math.max(1, parseInt(value.textContent) - 1);
  });
});

document.getElementById('stop').addEventListener('click', stopTimer);