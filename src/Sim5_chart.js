import * as d3 from 'd3';

const n = 1000
const perc = d3.format(".0%");

const margin = {top: 10, right: 30, bottom: 20, left: 60},
    width = 420 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom

const x = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, 1.0])
    .range([height, 0]);

const line = d3.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); })
    .curve(d3.curveLinear);
    
export function setup_chart(data) {
    const controlText = d3.select('#control-text').classed('notsim5', false)

    const svg = controlText.append('svg').attr('id', '#chart')
        .attr('viewBox', '0 0 415 180');

    const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top + 15})`);

    g.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height + 5)
         .attr("y", -2);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(d3.axisBottom(x).ticks(0));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('.0%')));

    g.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .datum(data)
        .attr("id", "line")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)

    g.append('line')
        .attr('id', 'avg-line')
        .style('stroke-width', 2)
        .style('stroke', 'darkgray')
        .attr('x1', 1).attr('y1', y(0))
        .attr('x2', width).attr('y2', y(0))

    g.append('line')
        .attr('id', 'best-line')
        .style('stroke-width', 2)
        .style('stroke', '#cb1f83')
        .attr('x1', 1).attr('y1', y(0))
        .attr('x2', width).attr('y2', y(0))

    svg.append('text')
        .attr('id', 'y-label')
        .attr('x', 0).attr('y', 10)
        .text('% fish in the dark')
        .style('font-size', '16px')
        .attr('transform', 'translate(2,140)rotate(270)')

    const legend_y = 170
    const legend_x = 45
    // High score text
    svg.append('line')
        .style('stroke-width', 2)
        .style('stroke', '#cb1f83')
        .attr('x1', legend_x + 250).attr('y1', legend_y-5)
        .attr('x2', legend_x + 260).attr('y2', legend_y-5)
    svg.append('text')
        .attr('id', 'high')
        .attr('x', legend_x + 262).attr('y', legend_y)
        .text('High: 0%')

    // Running average text
    svg.append('line')
        .style('stroke-width', 2)
        .style('stroke', 'darkgray')
        .attr('x1', legend_x + 125).attr('y1', legend_y-5)
        .attr('x2', legend_x + 135).attr('y2', legend_y-5)
    svg.append('text')
        .attr('id', 'running-avg')
        .attr('x', legend_x + 137).attr('y', legend_y)
        .text('Average: 0%')

    // Current average text
    svg.append('line')
        .style('stroke-width', 2)
        .style('stroke', 'rgb(63, 120, 168)')
        .attr('x1', legend_x).attr('y1', legend_y - 5)
        .attr('x2', legend_x + 10).attr('y2', legend_y - 5)
    svg.append('text')
        .attr('id', 'current')
        .attr('x', legend_x + 12).attr('y', legend_y)
        .text('Current: 0%')

    svg.append('text')
        .attr('id', 'trialNum')
        .attr('x', 68).attr('y', 30)
        .text('Trial: 1')
        .style('font-size', '12px')
    svg.append('text')
        .attr('id', 'timeLeft')
        .attr('x', 68).attr('y', 40)
        .text('Time Left: 30s')
        .style('font-size', '12px')
}

export function chart_tick(sim, val) {
    const avg = sim.mean_hidden;
    const best = sim.best_score;
    const data = sim.data;    

    // Push a new data point onto the back.
    data.push(val);

    // Redraw the line.
    d3.select('#line')
        .attr("d", line)
        .attr("transform", null)
        .transition()
        .attr("transform", "translate(" + x(-1) + ",0)")

    if (avg > best) {
        d3.select('#best-line')
            .attr('y1', y(avg))
            .attr('y2', y(avg));
        d3.select('#high')
            .text(`High: ${perc(avg.toFixed(2))}`)
    }

    d3.select('#avg-line')
        .attr('y1', y(avg))
        .attr('y2', y(avg));
    d3.select('#running-avg')
        .text(`Average: ${perc(avg.toFixed(2))}`)

    d3.select('#current')
        .text(`Current: ${perc(val.toFixed(2))}`)
        
    // Pop the old data point off the front.
    data.shift();

}