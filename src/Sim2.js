import BasicSim from './BasicSim'
import setup_sliders from './Sim2_sliders.js'
import * as d3 from "d3";
import parameters from './parameters'

class Sim2 extends BasicSim {
    constructor () {
        const params = parameters.mode2;
        super(params);
        this.params = params;

        this.N = params.N;
        

        d3.select('#controls')
            .style('height', '600px')
            .select('svg')
            .style("height", "270px")
            .style("width", "500px")
            .attr('viewBox', '0 0 500 270');

        d3.select('#control-text')
            .html('So far, the fish have all been moving randomly on their own. We<br/>\
                can simulate group behavior by introducing 2 new variables and<br/>\
                changing the algorithm (simulation rules). On this page, each<br/>\
                fish <i>(i)</i> will follow its nearest neighbor if it falls within the<br/>\
                defined attraction radius.<p/>\
                <b>Play with the sliders, explore, and observe! </b><p/>\
                New Variables:<br/>\
                • <b>N</b>: Number of fish <br/>\
                • <b>Attraction Radius</b>: the maximum distance a <br/>\
                nearest neighbor" can be for a fish to follow it. <p/>\
                <b>Questions for your exploration</b>: <p/>\
                1. How many fish are in a school? Is there a "magic number" N <br/>\
                for which schooling behavior emerges? <p/>\
                2. How does Attraction Radius affect schooling behavior?');

        setup_sliders(this.params);
        //document.getElementById('#controls').select('table').remove();
    }

    go() {
        if (this.N != this.params.N) {
            this.N = this.params.N;
            this.initialize(this.params);
            return;
        }

        super.go()
    }
}

export default function load () {
    document.getElementById("sim").innerHTML = '';
	const sim = new Sim2();

    return sim;
}