import BasicSim from './BasicSim'
import setup_sliders from './Sim3_sliders.js'
import parameters from './parameters'
import * as d3 from 'd3'

class Sim3 extends BasicSim {
    constructor () {
        const params = parameters.mode3;
        params.alignment_radius = params.al_def;
        params.attraction_radius = params.ar_def;
        super(params);
        this.params = params;

        d3.select('#controls')
            .select('svg')
            .style("width", "100%")
            .attr('viewBox', '0 0 500 270');

        d3.select('#overhead-text')
            .html('Imagine these fish are swimming in open water on a sunny day. \
                Any single fish could become easy prey for a larger predator. <p/>\
                Swimming in a larger group can make it more difficult for \
                predators to lock onto a single target. But schooling is not just \
                about following, but how well you align with other fish in your \
                group.<p/>\
                Explore how <i>Alignment</i> affects schooling behavior. <i>It may \
                take a few seconds for group behavior to coalesce!</i><p/>\
                <b>Questions</b>:<p/>\
                Does one of these variables alone seem to cause schooling, \
                or is there a combination that works best to cause the fish \
                to group together?');

        d3.select('#control-text')
            .html('Imagine these fish are swimming in open water on a sunny day. \
                Any single fish could become easy prey for a larger predator. <p/>\
                Swimming in a larger group can make it more difficult for \
                predators to lock onto a single target. But schooling is not just \
                about following, but how well you align with other fish in your \
                group.<p/>\
                Explore how <i>Alignment</i> affects schooling behavior. <i>It may \
                take a few seconds for group behavior to coalesce!</i><p/>\
                <b>Questions</b>:<p/>\
                Does one of these variables alone seem to cause schooling, \
                or is there a combination that works best to cause the fish \
                to group together?');

        setup_sliders(this.params);
        //document.getElementById('#controls').select('table').remove();
    }
}

export default function load () {
    document.getElementById("sim").innerHTML = '';
	const sim = new Sim3();

    return sim;
}