import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';

export default (params) => {
    const sliders_y = 35;
    const slider_spacing = 100;
    const slider_width = 480;

    const g = d3.select("#controls").select('svg').append('g')
        .attr('id', 'sliders')
        .attr('transform', `translate(15, ${sliders_y})`);

    const ticks = ['Much Greater', 'Equal', 'Much Greater']

    for (let i = 0; i < 3; i++) {
        // light to dark shading
        g.append("rect") 
            .attr('width', slider_width)
            .attr('height', 40)
            .attr('x', -10)
            .attr('y', slider_spacing * i)
            .attr("fill", "url(#svgGradient)")

        // ticks
        for (let j = 0; j < 5; j++) {
            g.append('line')
                .style('stroke-width', 1)
                .style('stroke', 'darkgray')
                .attr('x1', j * (slider_width - 20) / 4)
                .attr('y1', slider_spacing * i + 40)
                .attr('x2', j * (slider_width - 20) / 4)
                .attr('y2', slider_spacing * i + 50)
        }

        g.append('text').text('Light').attr('x', 0).attr('y', slider_spacing * i + 18).attr('text-anchor', 'start')
        g.append('text').text('Dark').attr('x', slider_width - 18).attr('y', slider_spacing * i + 18).attr('text-anchor', 'end').attr('fill', 'white')
        
        g.append('text').text(ticks[0]).attr('x', 10).attr('y', slider_spacing * i + 65).style("font-size", "12px").attr('text-anchor', 'start')
        g.append('text').text(ticks[1]).attr('x', slider_width/2 - 10).attr('y', slider_spacing * i + 65).style("font-size", "12px").attr('text-anchor', 'middle')
        g.append('text').text(ticks[2]).attr('x', slider_width - 30).attr('y', slider_spacing * i + 65).style("font-size", "12px").attr('text-anchor', 'end')
        
        g.append('text').text('-1').attr('x', -5).attr('y', slider_spacing * i + 33).style("font-size", "12px").attr('text-anchor', 'start')//.attr('fill', 'white')
        g.append('text').text('-0.5').attr('x', slider_width/4 - 7).attr('y', slider_spacing * i + 33).style("font-size", "12px").attr('text-anchor', 'middle').attr('fill', 'black')
        g.append('text').text('0').attr('x', slider_width/2 - 9).attr('y', slider_spacing * i + 33).style("font-size", "12px").attr('text-anchor', 'middle').attr('fill', 'black')
        g.append('text').text('+0.5').attr('x', slider_width * 3/4 - 6).attr('y', slider_spacing * i + 33).style("font-size", "12px").attr('text-anchor', 'end').attr('fill', 'white')
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
    const s_slider_max = 4;
    const s_slider_min = 0;
    const s_slider_mid = (s_slider_max - s_slider_min) / 2;
    const s_slider_step = (s_slider_max - s_slider_min) / 4;

    const speed_slider = sliderHorizontal()
        .min(s_slider_min).max(s_slider_max)
        .step(s_slider_step)
        .width(slider_width - 20)
        .value(s_slider_mid)
        .displayValue(false)
        .tickValues([])
        .on('onchange', (val) => {
            params.speed_in_the_light = s_max - val / s_slider_max;
            params.speed_in_the_dark = s_min + val / s_slider_max;
        });

    const speed = g.append('g')
        .call(speed_slider)
        .attr('transform', `translate(0, 40)`)

    // Alignment Radius
    const al_max = 4;
    const al_min = 0;
    const al_slider_max = 2;
    const al_slider_min = 0;
    const al_slider_mid = (al_slider_max - al_slider_min) / 2;
    const al_slider_step = (al_slider_max - al_slider_min) / 4;

    const al_slider = sliderHorizontal()
        .min(al_slider_min).max(al_slider_max)
        .step(al_slider_step)
        .width(slider_width - 20)
        .tickValues([])
        .value(al_slider_mid)
        .displayValue(false)
        .on('onchange', (val) => {
            if (val < al_slider_mid) {
                params.alignment_radius = al_max;
                params.dark_al = al_min + 
                    (al_max - al_min) * ((val - al_slider_mid) / al_slider_mid);    
            }
            else if (val > al_slider_mid) {
                params.alignment_radius = al_max - 
                    (al_max - al_min) * ((val - al_slider_mid) / al_slider_mid);
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
    const ar_slider_max = 4;
    const ar_slider_min = 0;
    const ar_slider_mid = (ar_slider_max - ar_slider_min) / 2;
    const ar_slider_step = (ar_slider_max - ar_slider_min) / 4;

    const ar_slider = sliderHorizontal()
        .min(ar_slider_min).max(ar_slider_max)
        .step(ar_slider_step)
        .width(slider_width - 20)
        .tickValues([])
        .value(ar_slider_mid)
        .displayValue(false)
        .on('onchange', (val) => {
            if (val <= ar_slider_mid) {
                params.attraction_radius = ar_max;
                params.dark_ar = ar_min + 
                    (ar_max - ar_min) * (val / ar_slider_mid);    
            }
            else if (val >= ar_slider_mid) {
                params.attraction_radius = ar_max - 
                    (ar_max - ar_min) * ((val - ar_slider_mid) / ar_slider_mid);
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
    
    return {speed_slider, al_slider, ar_slider}
}


