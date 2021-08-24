'use strict';
import PopUp from './popup.js'
import {GameBuilder, Reason} from './game.js';
import * as sound from './sound.js';

const game = new GameBuilder()
.withDuration(10)
.withCarrotCount(14)
.withBugCount(20)
.build();

game.start();
game.setGameStopListener(stopReason);


function stopReason(reason){
    switch(reason){
        case Reason.cancel:
            finishBanner.showWithText('REPLAY❓');
            sound.alert();
            break;
        case Reason.win:
            finishBanner.showWithText('YOU WON 🎉');
            sound.win();
            break;
        case Reason.lose:
            finishBanner.showWithText('YOU LOST 💩');
            sound.bug();
            break;
        default:
            throw new Error('undefined reason');
            break;
    } 
}

const finishBanner = new PopUp();
finishBanner.setOnClickFunction(()=>{game.start()});
