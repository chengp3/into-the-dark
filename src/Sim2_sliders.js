import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';


export default (params) => {
    const svg = d3.select("#controls").select('svg')
    const sliders_y = 40;
    const slider_spacing = 90;
    const slider_width = 480;

    const n_slider = sliderHorizontal().min(1).max(30).step(1).width(slider_width - 20)
        .tickValues([1, 15, 30])
        .value(1)
        //.displayValue(false)
        .on('onchange', (val) => {
            params.N = val;
        });

    const n = svg.append('g')
        .call(n_slider)
        .attr('transform', `translate(15, ${sliders_y})`)

    svg.append("text")
        .text("N")
        .attr("x", slider_width / 2).attr('text-anchor', 'middle')
        .attr("y", sliders_y - 20);


    const ar_slider = sliderHorizontal().min(0).max(10).step(1).width(slider_width - 20)
        .tickValues([0, 5, 10])
        .value(0)
        //.displayValue(false)
        .on('onchange', (val) => {
            params.attraction_radius = val * 4;
        });

    const ar = svg.append('g')
        .call(ar_slider)
        .attr('transform', `translate(15, ${sliders_y + slider_spacing})`)

    svg.append("text")
        .text("Attraction Radius")
        .attr("x", slider_width/2).attr('text-anchor', 'middle')
        .attr("y", sliders_y + slider_spacing - 20);

    return {n_slider, ar_slider}
}


