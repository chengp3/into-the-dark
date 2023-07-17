import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';

export default (params) => {
    const sliders_y = 100;
    const slider_spacing = 110;
    const slider_width = 410;

    const go_button = d3.select('#controls').select('.button')
        .attr('transform', `translate(${slider_width / 2}, ${params.widgets.playbutton_size/2 + 5})`)

    const g = d3.select("#controls").select('svg').append('g')
        .attr('id', 'sliders')
        .attr('transform', `translate(10, ${sliders_y})`);

    const ticks = ['Much Greater', 'Equal', 'Much Greater']

    for (let i = 0; i < 3; i++) {
        g.append("rect")
            .attr('width', slider_width)
            .attr('height', 40)
            .attr('x', -10)
            .attr('y', slider_spacing * i)
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
        
        g.append('text').text('Light').attr('x', 0).attr('y', slider_spacing * i + 18).attr('text-anchor', 'start')
        g.append('text').text('Dark').attr('x', slider_width - 18).attr('y', slider_spacing * i + 18).attr('text-anchor', 'end').attr('fill', 'white')
        
        g.append('text').text(ticks[0]).attr('x', 10).attr('y', slider_spacing * i + 65).style("font-size", "12px").attr('text-anchor', 'start')
        g.append('text').text(ticks[1]).attr('x', slider_width/2 - 10).attr('y', slider_spacing * i + 65).style("font-size", "12px").attr('text-anchor', 'middle')
        g.append('text').text(ticks[2]).attr('x', slider_width - 30).attr('y', slider_spacing * i + 65).style("font-size", "12px").attr('text-anchor', 'end')
        
        g.append('text').text('-1').attr('x', -5).attr('y', slider_spacing * i + 33).style("font-size", "12px").attr('text-anchor', 'start')//.attr('fill', 'white')
        g.append('text').text('-0.5').attr('x', slider_width/4 - 10).attr('y', slider_spacing * i + 33).style("font-size", "12px").attr('text-anchor', 'middle').attr('fill', 'black')
        g.append('text').text('0').attr('x', slider_width/2 - 9).attr('y', slider_spacing * i + 33).style("font-size", "12px").attr('text-anchor', 'middle').attr('fill', 'black')
        g.append('text').text('+0.5').attr('x', slider_width * 3/4).attr('y', slider_spacing * i + 33).style("font-size", "12px").attr('text-anchor', 'end').attr('fill', 'white')
        g.append('text').text('+1').attr('x', slider_width - 16).attr('y', slider_spacing * i + 33).style("font-size", "12px").attr('text-anchor', 'end').attr('fill', 'white')

        const labels = ['Relative Speed', 'Relative Alignment Radius', 'Relative Attraction Radius']
        g.append('text').text(labels[0]).attr('x', slider_width/2 - 10).attr('y', -5).attr('text-anchor', 'middle');
        g.append('text').text(labels[1]).attr('x', slider_width/2 - 10).attr('y', slider_spacing - 5).attr('text-anchor', 'middle');
        g.append('text').text(labels[2]).attr('x', slider_width/2 - 10).attr('y', slider_spacing * 2 - 5).attr('text-anchor', 'middle');
    }

    var defs = g.append("defs");

    var gradient = defs.append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "100%")
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


