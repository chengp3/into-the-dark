import BasicSim from './BasicSim'
import setup_sliders from './Sim1_sliders.js'
import setup_table from './Sim1_table.js'
import * as d3 from "d3";
import parameters from './parameters'

class Sim1 extends BasicSim {
    constructor () {
        const params = parameters.mode1;
        super(params);
        this.params = params;
        
        d3.select("#controls")
            .select("svg")
            .attr("viewBox", `0 0 500 100`);

        d3.select('#overhead-text')
            .style("position", "relative")
            .html('This is a simulation that models fish behavior. Each\
            virtual fish is a point in a data grid.\
            It has an X and a Y coordinate, a speed, and a direction.\
            Try changing the speed with the slider below.');

        d3.select('#control-text')
            .style("position", "relative")
            .html('This is a simulation that models fish behavior. Each\
            virtual fish is a point in a data grid.\
            It has an X and a Y coordinate, a speed, and a direction.\
            Try changing the speed with the slider below.');

        setup_sliders(this.params);

        

        setup_table(this.agents);
            
        this.display.append('line') // mid-left
            .style('stroke-width', 1) 
            .style('stroke', 'black')
            .attr('x1', 0).attr('y1', 250).attr('x2', 10).attr('y2', 250)
        this.display.append('line') // bot-mid
            .style('stroke-width', 1)
            .style('stroke', 'black')
            .attr('x1', 250).attr('y1', 490).attr('x2', 250).attr('y2', 500)
        this.display.append('line') // bot-left
            .style('stroke-width', 1)
            .style('stroke', 'black')
            .attr('x1', 25).attr('y1', 490).attr('x2', 25).attr('y2', 500)
        this.display.append('line') // bot-right
            .style('stroke-width', 1)
            .style('stroke', 'black')
            .attr('x1', 475).attr('y1', 490).attr('x2', 475).attr('y2', 500)
        this.display.append('line') // top-left
            .style('stroke-width', 1)
            .style('stroke', 'black')
            .attr('x1', 0).attr('y1', 25).attr('x2', 10).attr('y2', 25)
        this.display.append('line') // bot-left
            .style('stroke-width', 1)
            .style('stroke', 'black')
            .attr('x1', 0).attr('y1', 475).attr('x2', 10).attr('y2', 475)

        this.display.append('text')
            .text('0')
            .attr('transform', 'translate(25, 480)')
            .style('font-size', '14px')
            .style('text-anchor', 'middle');
        
        this.display.append('text')
        .text('5')
        .attr('transform', 'translate(25, 255)')
            .style('font-size', '14px')
            .style('text-anchor', 'middle');

        this.display.append('text')
            .text('10')
            .attr('transform', 'translate(25, 30)')
            .style('font-size', '14px')
            .style('text-anchor', 'middle');

        this.display.append('text')
            .text('5')
            .attr('transform', 'translate(250, 480)')
            .style('font-size', '14px')
            .style('text-anchor', 'middle');

        this.display.append('text')
            .text('10')
            .attr('transform', 'translate(475, 480)')
            .style('font-size', '14px')
            .style('text-anchor', 'middle');

        this.display.append('text')
            .text('Y')
            .attr('transform', 'translate(49, 257)')
            .style('font-size', '20px')
            .style('text-anchor', 'middle')
            .attr('font-weight', 600);

        this.display.append('text')
            .text('X')
            .attr('transform', 'translate(250, 455)')
            .style('font-size', '20px')
            .style('text-anchor', 'middle')
            .attr('font-weight', 600);
    }

    go() {
        setup_table(this.agents);
        super.go();
	}

}

export default function load () {
    document.getElementById("sim").innerHTML = '';
	const sim = new Sim1();

    return sim;
}