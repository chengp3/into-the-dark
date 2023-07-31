import BasicSim from './BasicSim'
import setup_sliders from './Sim4_sliders.js'
import * as d3 from "d3";
import parameters from './parameters'

class Sim4 extends BasicSim {
    constructor () {
        const params = parameters.mode4;
        params.alignment_radius = params.al_def;
        params.dark_al = params.al_def;
        params.attraction_radius = params.ar_def;
        params.dark_ar = params.ar_def;
        params.speed_in_the_dark = params.speed_def;
        params.speed_in_the_light = params.speed_def;
        super(params);
        this.params = params;

        d3.select("#controls")
            .select("svg")
            .style("width", "100%")
            .attr("viewBox", `0 0 500 350`);

        d3.select('#overhead-text')
            .html('Hiding in the dark is a common strategy for prey to avoid being \
            eaten. But <i>how does a school of fish find its way into the dark?</i> \
            Each fish only has a small, partial field of view and a little control \
            over where the school is going. (it is effectively leaderless). <p/>\
            <b>Hypothesis</b>: Scientists have proposed that fish schools might be \
            found more in the dark than the light if the behavioral rules \
            controlling their movement are consistently different in the light \
            versus the dark. <p/>\
            <b>Question</b>: How can you configure the sliders below to maximize \
            the time in the dark for an average fish?');

        d3.select('#control-text')
            .html('Hiding in the dark is a common strategy for prey to avoid being \
            eaten. But <i>how does a school of fish find its way into the dark?</i> \
            Each fish only has a small, partial field of view and a little control \
            over where the school is going. (it is effectively leaderless). <p/>\
            <b>Hypothesis</b>: Scientists have proposed that fish schools might be \
            found more in the dark than the light if the behavioral rules \
            controlling their movement are consistently different in the light \
            versus the dark. <p/>\
            <b>Question</b>: How can you configure the sliders below to maximize \
            the time in the dark for an average fish?');

        setup_sliders(params);
    }
}

export default function load () {
    document.getElementById("sim").innerHTML = '';
	const sim = new Sim4();

    return sim;
}