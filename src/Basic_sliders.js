import * as d3 from 'd3';
import { DateTime } from "luxon";

function setButtonState (sim, playpause) {
    if (sim.playing) {
        playpause.src = './pause.svg';
    }
    else { playpause.src = './play.svg'; }
}

export default function (sim) {
    const container = document.getElementById('button-container')
    container.innerHTML = 
        `<img id="playpause" src=./play.svg width="30" height="30" class='pr3'/>`
    if (sim.params.reset_enabled) {
        container.innerHTML += 
            `<img id="reset" src=./reset.svg width="30" height="30" class='ph2'/>`

        const reset = document.getElementById('reset');

        reset.addEventListener('click', function () {
            sim.playing = false;
            if (sim.timer) {sim.timer.stop();}
            setButtonState(sim, playpause);
    
            sim.reset(sim.params);
        });
    }
    
    const playpause = document.getElementById('playpause');

    playpause.addEventListener('click', function () {
        sim.playing = !sim.playing;
        setButtonState(sim, playpause);

        if (sim.playing) {
            if (sim.start) { sim.start = DateTime.now(); }
            sim.timer = d3.interval(()=>sim.go());
        } else {
            sim.timer.stop();
        }
    });
}