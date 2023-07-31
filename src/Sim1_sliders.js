import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';


export default (params) => {
    const svg = d3.select("#controls").select('svg')
    const sliders_y = 50;
    const slider_width = 450;

    const g = d3.select("#controls").select('svg').append('g')
        .attr('id', 'sliders')
        .attr('transform', 'translate(10,0)')

    for (let j = 0; j < 10; j++) {
        g.append('line')
            .style('stroke-width', 1)
            .style('stroke', 'black')
            .attr('x1', 10 + j * (slider_width) / 9)
            .attr('y1', sliders_y - 2)
            .attr('x2', 10 + j * (slider_width) / 9)
            .attr('y2', sliders_y + 2)
    }

    const s_slider = sliderHorizontal().min(1).max(10).step(1).width(slider_width)
        .value(2)
        .tickValues([])
        .displayValue(false)
        .on('onchange', (val) => {
            params.speed_in_the_light = val / 3 - .2;
    });

    const s = g.append('g')
        .call(s_slider)
        .attr('transform', `translate(10, ${sliders_y})`)

    g.append('text').text('Slow').attr('x', 10).attr('y', sliders_y + 25).style("font-size", "16px")
    g.append('text').text('Fast').attr('x', slider_width + 5).attr('y', sliders_y + 25).style("font-size", "16px").attr('text-anchor', 'end')

    g.append("text")
        .text("Speed")
        .attr("x", slider_width/2 + 12)
        .attr("y", sliders_y - 20)
        //.style("font-weight", 600)
        .style('font-size', '24px')
        .attr('text-anchor', 'middle');
}