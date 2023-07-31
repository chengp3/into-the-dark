// this sets up the container for the explorable, including the display panel and the controls panel
// this function really needs not to be touched and is fairly identical for all explorables
// it's only used by index.js for setting up the container as a first step.

import * as d3 from "d3"

export default (config)=>{
	const container = d3.select('#sim').classed("mw8 center cf",true);
	
	container.append('div').attr('id', 'overhead-text')
		.style("width", "100%")
		.style("word-wrap", "break-word");	

	const display = container.append("div")
		.attr("id","display")
		.attr("class","display-panel")
		.classed(config.display_class,true)
		.append('svg')
		.attr("viewBox", `0 0 ${config.display_size.width} ${config.display_size.height}`)		

	const controls = container.append("div")
		.attr("id","controls")
		.attr("class","control-panel")
		.classed(config.controls_class,true)
	
	controls.append('div').attr('id', 'control-text').style("width", '100%').classed('notsim5', true);
	controls.append('div').attr('id', 'button-container').style('height', '50px')	
		.attr('class', 'flex w-95 items-center justify-center');
	const c_svg = controls.append("svg")
		.attr("viewBox", `0 0 ${config.controls_size.width} ${config.controls_size.height}`)

	if (config.controls_border){
		c_svg.append("rect").attr("class","border")
		.attr("width", config.controls_size.width)
		.attr("height", config.controls_size.height)
	}

	if (config.display_border){
		display.append("rect").attr("class","border")
		.attr("width", config.display_size.width)
		.attr("height", config.display_size.height)
	}
	
	return { display: display, controls: c_svg}
}




