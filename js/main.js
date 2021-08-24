'use strict';
import PopUp from './popup.js'
import Game from './game.js';

const game = new Game(3,2,2);
game.start();
game.setGameStopListener(stopReason)

function stopReason(reason){
    switch(reason){
        case "cancel":
            finishBanner.showWithText('REPLAY❓');
            break;
        case "win":
            finishBanner.showWithText('YOU WON 🎉');
            break;
        case "lose":
            finishBanner.showWithText('YOU LOST 💩');
            break;
        default:
            throw new Error('undefined reason');
            break;
    } 
}

const finishBanner = new PopUp();
finishBanner.setOnClickFunction(()=>{game.start()});
