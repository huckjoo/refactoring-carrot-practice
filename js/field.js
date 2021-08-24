'use strict';
const CARROT_SIZE = 80;
import * as sound from './sound.js';

export const itemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug',
})

export class GameField{
    constructor(CARROT_COUNT,BUG_COUNT){
        this.carrotCount = CARROT_COUNT;
        this.bugCount = BUG_COUNT;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click',(event)=>{this.onClick(event)});
    }
    setOnClickFunction(onClickfunction){
        this.onClickFunction = onClickfunction;
    }
    onClick(event){
        const target = event.target;
        if(target.matches('.carrot')){
            target.remove();
            sound.carrot();
            this.onClickFunction && this.onClickFunction(itemType.carrot);
        }else if(target.matches('.bug')){
            this.onClickFunction && this.onClickFunction(itemType.bug);
        }
    }
    clean(){
        this.field.innerHTML = '';
    }
    init(){
        this.clean();
        this.addItem(itemType.carrot, this.carrotCount, 'img/carrot.png');
        this.addItem(itemType.bug, this.bugCount, 'img/bug.png');
    }
    addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        const fieldNode = this.field;
        for (let i = 0; i < count; i++) {
          const item = document.createElement('img');
          item.setAttribute('class', className);
          item.setAttribute('src', imgPath);
          item.style.position = 'absolute';
          const x = randomNumber(x1, x2);
          const y = randomNumber(y1, y2);
          item.style.left = `${x}px`;
          item.style.top = `${y}px`;
          fieldNode.appendChild(item);
        }
      }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }