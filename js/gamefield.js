'use strict';
const CARROT_SIZE = 80;

export default class GameField{
    constructor(){
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click',(event)=>{
            this.onClickFunction && this.onClickFunction(event);
        })
    }
    setOnClickFunction(onClickfunction){
        this.onClickFunction = onClickfunction;
    }
    clean(){
        this.field.innerHTML = '';
    }
    appendItems(item){
        this.field.appendChild(item)
    }
    addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        for (let i = 0; i < count; i++) {
          const item = document.createElement('img');
          item.setAttribute('class', className);
          item.setAttribute('src', imgPath);
          item.style.position = 'absolute';
          const x = randomNumber(x1, x2);
          const y = randomNumber(y1, y2);
          item.style.left = `${x}px`;
          item.style.top = `${y}px`;
          field.appendItems(item);
        }
      }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }