'use strict';
import PopUp from './popup.js'
import GameField from './gamefield.js';
import * as sound from './sound.js';
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameBtn = document.querySelector('.game__button');
const timerIndicator = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

const finishBanner = new PopUp();
finishBanner.setOnClickFunction(startGame);

const gameField = new GameField(CARROT_COUNT,BUG_COUNT);
gameField.setOnClickFunction(onFieldClick);

function onFieldClick(item) {
  if (!started) {
    return;
  }
  if (item === 'carrot') {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === 'bug'){
    finishGame(false);
  }
}

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  sound.backgroundPlay();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  finishBanner.showWithText('REPLAY❓');
  sound.alert();
  sound.backgroundStop();
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    sound.win();
  } else {
    sound.bug();
  }
  stopGameTimer();
  sound.backgroundStop();
  finishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  timerIndicator.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(score === CARROT_COUNT);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerIndicator.innerHTML = `${minutes}:${seconds}`;
}

function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init()
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}


