'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }
  
function stopSound(sound) {
    sound.pause();
  }

export function carrot(){
    playSound(carrotSound);
}
export function alert(){
    playSound(alertSound);
}
export function bug(){
    playSound(bugSound);
}
export function win(){
    playSound(winSound);
}
export function backgroundPlay(){
    playSound(bgSound);
}
export function backgroundStop(){
    stopSound(bgSound);
}