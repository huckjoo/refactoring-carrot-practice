'use strict';

import GameField from './field.js';
import * as sound from './sound.js';
import itemType from './field';
export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
})

export class GameBuilder{
    withDuration(duration){
        this.duration = duration;
        return this;
    }
    withCarrotCount(num){
        this.carrotCount = num;
        return this;
    }
    withBugCount(num){
        this.bugCount = num;
        return this;
    }
    build(){
        return new Game(
            this.carrotCount,
            this.bugCount,
            this.duration
        )
    }
}

class Game{
    constructor(CARROT_COUNT,BUG_COUNT,duration){
        this.carrotCount = CARROT_COUNT;
        this.bugCount = BUG_COUNT;
        this.gameDuration = duration;

        this.started = false;
        this.score = 0;
        this.timer = undefined;

        this.gameBtn = document.querySelector('.game__button');
        this.timerIndicator = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn.addEventListener('click',()=>{
            if(this.started){
                this.finish(Reason.cancel);
            }else{
                this.start();
            }
        });
        this.gameField = new GameField(this.carrotCount,this.bugCount);
        this.gameField.setOnClickFunction(this.onFieldClick);

    }
    onFieldClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === itemType.carrot) {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {
                this.finish(Reason.win);
            }
            } else if (item === itemType.bug){
            this.finish(Reason.lose);
            }
      }
    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }
    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.backgroundPlay();
    }
      
    finish(state) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.backgroundStop();
        this.onGameStop && this.onGameStop(state);
      }
      
      showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
      }
      
      hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
      }
      
      showTimerAndScore() {
        this.timerIndicator.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
      }
      
      startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
          if (remainingTimeSec <= 0) {
            clearInterval(this.timer);
            this.finish(this.score === this.carrotCount);
            return;
          }
          this.updateTimerText(--remainingTimeSec);
        }, 1000);
      }
      
      stopGameTimer() {
        clearInterval(this.timer);
      }
      
      updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
      }
      
      initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init()
      }
      
      updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
      }
}