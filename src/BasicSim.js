// you need a basic game with the following features: 
// all versions have agents that have x, y, speed, velocity

// what does the basic simulation need ?
// agents
// config.js
// a container
// controls and interactions for starting and stopping

// setup_ssimulation ? 

import './styles.css'
import Agent from "./Agent.js"
import Hideout from "./Hideout.js"
import {each,range,map} from "lodash-es"
import setup_container from "./setup_container.js"
import setup_go from './Basic_sliders.js'
import * as d3 from "d3"
import {tadpole} from "./utils.js"
import parameters from './parameters'


const X = d3.scaleLinear().domain([0, 128]);
const Y = d3.scaleLinear().domain([0, 128]);

export default class BasicSim {
    constructor(params) {
		this.params = params;
		const container = setup_container(params);

	    this.display = container.display; // this is the SVG!!! not the display div!!
	    this.controls = container.controls; 
			
		this.agents = [];
		this.hideouts = [];
		this.initialize(this.params);

		this.timer = {};
		this.playing = false;

		setup_go(this);
    }

	initialize(params) {
		this.hideouts = map(range(params.number_hideouts), i => {
			const hideout = new Hideout(i, params)
			return hideout;
		})

		this.agents = map(range(params.N), i => {
			const agent = new Agent(i, this.hideouts, params);
			return agent;
		})

		const W = params.display_size.width;
		const H = params.display_size.height;
		
		X.range([0,W]);
		Y.range([0,H]);
			
		this.display.select("#origin").remove()
			
		const origin = this.display.append("g").attr("id","origin")

		origin.selectAll(".hideout").data(this.hideouts).enter().append("circle")
			.attr("class", "hideout")
			.attr("r", function(d){return X(d.r)})
			.attr("cx", d=>X(d.x))
			.attr("cy", d=>Y(d.y))
			.style("fill", params.simulation.hideout_color)
			.style("opacity", params.dark_zones ? 1 : 0)

		const agent = origin.selectAll(".agent").data(this.agents).enter().append("g")
			.attr("class","agent")
			.attr("transform",d => `translate(${X(d.x)}, ${Y(d.y)})rotate(${(d.theta)})`)
		
		agent.append("path")
			.attr("d",tadpole(params.agentsize))
			.attr("fill", (d, i) => params.colors[i % params.colors.length])
	}

	go() {
		each(this.hideouts, h => h.set_new_pos())
		each(this.agents, agent => agent.set_new_pos(this.agents, this.hideouts))
				
		this.display.selectAll(".hideout")
			.attr("cx",d=>X(d.x))
			.attr("cy",d=>Y(d.y))

		this.display.selectAll(".agent")
			.attr("transform",d => "translate("+X(d.x)+","+Y(d.y)+")rotate("+(d.theta)+")")
	}

}

