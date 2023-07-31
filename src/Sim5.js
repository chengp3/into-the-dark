import BasicSim from './BasicSim'
import setup_sliders from './Sim5_sliders.js'
import {setup_chart, chart_tick} from './Sim5_chart.js'
import * as d3 from "d3";
import parameters from './parameters'
import setup_modal from './Sim5_modal'
import { Duration, DateTime } from "luxon";
import { updateAvg } from './utils';
import { setupScores, updateTable } from './Sim5_scores';

class Sim5 extends BasicSim {
    constructor () {
        const params = parameters.mode5;
        params.alignment_radius = params.al_def;
        params.dark_al = params.al_def;
        params.attraction_radius = params.ar_def;
        params.dark_ar = params.ar_def;
        params.speed_in_the_dark = params.speed_def;
        params.speed_in_the_light = params.speed_def;
        super(params);
        this.params = params;

        this.params = params;
        this.mean_hidden = 0;
        this.best_score = 0;
        this.data = new Array(1000).fill(0);
        this.ticks = 1;
        this.start = DateTime.now();
        this.duration = Duration.fromObject({ seconds: 0 });
        this.avg_ar = 2;
        this.avg_al = 1;
        this.avg_s = 2;
        this.trialNumber = 1;
        this.results = [];

        d3.select("#controls")
            .select("svg")
            .style("width", "100%")
            .attr("viewBox", `0 0 500 350`);

        this.sliders = setup_sliders(this.params);
        d3.select('#control-text').classed('notsim5', false);
        setup_chart(this.data);
        setupScores(this);
        setup_modal();
        
    }

    soft_reset(params) {
        this.total = 0;
        this.mean_hidden = 0;
        this.best_score = 0;
        this.ticks = 1;
        this.duration = Duration.fromObject({ seconds: 0 });
        this.start = {};
        this.data = new Array(1000).fill(0);
        d3.select('#line').datum(this.data)
        this.updateSliderAverages()
        this.playing = false;
        document.getElementById('playpause').src = './play.svg';
    }

    reset(params) {
        this.total = 0;
        this.mean_hidden = 0;
        this.best_score = 0;
        this.ticks = 1;
        this.updateSliderAverages()
        this.duration = Duration.fromObject({ seconds: 0 });
        this.start = {};
        this.data = new Array(1000).fill(0);
        d3.select('#line').datum(this.data)
        this.sliders.speed_slider.value(2)
        this.sliders.al_slider.value(1)
        this.sliders.ar_slider.value(2)
        params.alignment_radius = params.al_def;
        params.dark_al = params.al_def;
        params.attraction_radius = params.ar_def;
        params.dark_ar = params.ar_def;
        params.speed_in_the_dark = params.speed_def;
        params.speed_in_the_light = params.speed_def;
        this.avg_ar = 2;
        this.avg_al = 1;
        this.avg_s = 2;
        this.playing = false;
        document.getElementById('playpause').src = './play.svg';

        this.initialize(this.params);
    }

    updateSliderAverages() {
        let speedSliderVal = 2, arSliderVal = 2, alSliderVal = 1;
        if (this.sliders) {
            speedSliderVal = this.sliders.speed_slider.value();
            arSliderVal = this.sliders.ar_slider.value();
            alSliderVal = this.sliders.al_slider.value();
        }
        this.avg_s = updateAvg(this.avg_s, speedSliderVal, this.ticks);
        this.avg_ar = updateAvg(this.avg_ar, arSliderVal, this.ticks);
        this.avg_al = updateAvg(this.avg_al, alSliderVal, this.ticks);
    }

    go() {
        const maxDuration = Duration.fromObject({ seconds: 30 });

        // If 0 seconds, increment trial #
        if (this.duration.seconds === 0) {
            d3.select('#trialNum').text(`Trial: ${this.trialNumber}`)
            d3.select('#timeLeft').text('Time Left: 30s');
            this.initialize(this.params);
        }

        const now = DateTime.now();
        const newDuration = this.duration.plus(now.diff(this.start, 'seconds'));
        if (Math.floor(newDuration.seconds) > Math.floor(this.duration.seconds)) {
            d3.select('#timeLeft').text(`Time Left: ${30 - Math.floor(newDuration.seconds)}s`);
        }
        this.duration = newDuration;
        this.start = now;
         
        // If 30 seconds has elapsed, stop;
        if (this.duration >= maxDuration) {
            if (this.timer.stop) {
                const slider_setting = d3.scaleLinear()
                    .domain([0, 4])
                    .range([-1, 1]);
                this.timer.stop();
                this.results.push([this.trialNumber, 
                    slider_setting(this.avg_s).toFixed(1), 
                    slider_setting(this.avg_al * 2).toFixed(1), 
                    slider_setting(this.avg_ar).toFixed(1), 
                    this.mean_hidden
                ]);
                updateTable(this.results);

                this.soft_reset(this.params);
                this.trialNumber++;
            }
            return
        }

        super.go();

        const n_hidden = this.agents.reduce((acc, a) => acc + a.ishidden, 0);
        const frac_hidden = n_hidden / this.params.N;
        this.mean_hidden = updateAvg(this.mean_hidden, frac_hidden, this.ticks);

        this.ticks += 1;
        this.updateSliderAverages();

        chart_tick(this, frac_hidden);
        this.best_score = Math.max(this.best_score, this.mean_hidden);
    }
}

export default function load () {
    document.getElementById("sim").innerHTML = '';
	const sim = new Sim5();

    return sim;
}