import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';

export default (params) => {
    const sliders_y = 100;
    const slider_spacing = 90;
    const slider_width = 410;

    const go_button = d3.select('#controls').select('svg').select('g:nth-child(1)')
        .attr('transform', `translate(${slider_width / 2 - 40}, ${params.widgets.playbutton_size/2 + 3})`)

    const reset_button = d3.select('#controls').select('svg').select('g:nth-child(2)')
        .attr('transform', `translate(${slider_width / 2 + 40}, ${params.widgets.playbutton_size/2 + 3})`)

    const g = d3.select("#controls").select('svg').append('g')
        .attr('id', 'sliders')
        .attr('transform', `translate(10, ${sliders_y})`);

    const ticks = ['Much Greater', 'Equal', 'Much Greater']

    for (let i = 0; i < 3; i++) {
        g.append("rect")
            .attr('width', slider_width)
            .attr('height', 30)
            .attr('x', -10)
            .attr('y', slider_spacing * i + 10)
            .attr("fill", "url(#svgGradient)")

        for (let j = 0; j < 5; j++) {
            g.append('line')
                .style('stroke-width', 1)
                .style('stroke', 'darkgray')
                .attr('x1', -10 + j * slider_width / 4)
                .attr('y1', slider_spacing * i + 40)
                .attr('x2', -10 + j * slider_width / 4)
                .attr('y2', slider_spacing * i + 50)
        }

        g.append('text').text('In the Light').attr('x', 0).attr('y', slider_spacing * i + 30).attr('text-anchor', 'start')
        g.append('text').text('In the Dark').attr('x', slider_width - 20).attr('y', slider_spacing * i + 30).attr('text-anchor', 'end')
        g.append('text').text(ticks[0]).attr('x', 10).attr('y', slider_spacing * i + 62).style("font-size", "12px").attr('text-anchor', 'start')
        g.append('text').text(ticks[1]).attr('x', slider_width/2 - 10).attr('y', slider_spacing * i + 62).style("font-size", "12px").attr('text-anchor', 'middle')
        g.append('text').text(ticks[2]).attr('x', slider_width - 40).attr('y', slider_spacing * i + 62).style("font-size", "12px").attr('text-anchor', 'end')

        const labels = ['Relative Speed', 'Relative Alignment Radius', 'Relative Attraction Radius']
        g.append('text').text(labels[0]).attr('x', slider_width/2 - 10).attr('text-anchor', 'middle');
        g.append('text').text(labels[1]).attr('x', slider_width/2 - 10).attr('y', slider_spacing).attr('text-anchor', 'middle');
        g.append('text').text(labels[2]).attr('x', slider_width/2 - 10).attr('y', slider_spacing * 2).attr('text-anchor', 'middle');
    }

    

    var defs = g.append("defs");

    var gradient = defs.append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "100%");
    
    gradient.append("stop")
    .attr("class", "start")
    .attr("offset", "0%")
    .attr("stop-color", "white")
    .attr("stop-opacity", 0);
    
    gradient.append("stop")
    .attr("class", "end")
    .attr("offset", "100%")
    .attr("stop-color", "black")
    .attr("stop-opacity", 1);

    // Speed
    const s_max = 1.5;
    const s_min = .5;
  

    const speed_slider = sliderHorizontal().min(0).max(10).step(1).width(slider_width - 20)
        .value(5)
        .displayValue(false)
        .tickValues([])
        .on('onchange', (val) => {
            params.speed_in_the_light = s_max - val / 10;
            params.speed_in_the_dark = s_min + val / 10;
        });

    const speed = g.append('g')
        .call(speed_slider)
        .attr('transform', `translate(0, 40)`)


    // Alignment Radius
    const al_max = 4;
    const al_min = 0;

    const al_slider = sliderHorizontal().min(0).max(10).step(1).width(slider_width - 20)
        .tickValues([])
        .value(5)
        .displayValue(false)
        .on('onchange', (val) => {
            if (val <= 4) {
                params.alignment_radius = al_max;
                params.dark_al = al_min + (al_max - al_min) * val / 5;    
            }
            else if (val >= 6) {
                params.alignment_radius = al_max - (val - 5) * (al_max - al_min) / 5;
                params.dark_al = al_max;
            }
            else {
                params.alignment_radius = al_max;
                params.dark_al = al_max;
            }
        });

    const al = g.append('g')
        .call(al_slider)
        .attr('transform', `translate(0, ${slider_spacing + 40})`)

    // Attraction Radius
    const ar_max = 80;
    const ar_min = 5;

    const ar_slider = sliderHorizontal().min(0).max(10).step(1).width(slider_width - 20)
        .tickValues([])
        .value(5)
        .displayValue(false)
        .on('onchange', (val) => {
            if (val <= 4) {
                params.attraction_radius = ar_max;
                params.dark_ar = ar_min + (ar_max-ar_min) * val / 5;    
            }
            else if (val >= 6) {
                params.attraction_radius = ar_max - (val - 5) * (ar_max-ar_min) / 5;
                params.dark_ar = ar_max;
            }
            else {
                params.attraction_radius = ar_max;
                params.dark_ar = ar_max;
            }
        });

    const ar = g.append('g')
        .call(ar_slider)
        .attr('transform', `translate(0, ${slider_spacing * 2 + 40})`)
        
}


