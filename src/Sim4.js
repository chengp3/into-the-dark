import BasicSim from './BasicSim'
import setup_sliders from './Sim4_sliders.js'
import * as d3 from "d3";
import parameters from './parameters'

class Sim4 extends BasicSim {
    constructor () {
        const params = parameters.mode4;
        super(params);
        this.params = params;

        d3.select("#controls")
            .style("height", "650px")
            .select("svg")
            .style("height", "420")
            .style("width", "450px")
            .attr("viewBox", `0 0 450 420`);

        d3.select('#control-text')
            .html('Hiding in the dark is a common strategy for prey to avoid being <br/>\
            eaten. But <i>how does a school of fish find its way into the dark?</i> <br/>\
            Each fish only has a small, partial field of view and a little control <br/>\
            over where the school is going. (it is effectively leaderless). <p/>\
            <b>Hypothesis</b>: Scientists have proposed that fish schools might be <br/>\
            found more in the dark than the light if the behavioral rules <br/>\
            controlling their movement are consistently different in the light <br/>\
            versus the dark. <p/>\
            <b>Question</b>: How can you configure the sliders below to maximize <br/>\
            the time in the dark for an average fish?');
    
        setup_sliders(this.params);
        //document.getElementById('#controls').select('table').remove();
    }
}

export default function load () {
    document.getElementById("sim").innerHTML = '';
	const sim = new Sim4();

    return sim;
}