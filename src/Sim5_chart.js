import * as d3 from 'd3';

const n = 1000
const perc = d3.format(".0%");

const margin = {top: 10, right: 20, bottom: 20, left: 40},
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
    //d3.select('control-text').select('svg').remove('#chart');

    const svg = d3.select('#control-text').append('svg').attr('id', '#chart')
        .attr('viewBox', '0 0 500 160');

    const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    g.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

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
        .style('stroke-width', 1)
        .style('stroke', 'darkgray')
        .attr('x1', 1)
        .attr('y1', y(0))
        .attr('x2', width)
        .attr('y2', y(0))

    g.append('line')
        .attr('id', 'best-line')
        .style('stroke-width', 1)
        .style('stroke', 'crimson')
        .attr('x1', 1)
        .attr('y1', y(0))
        .attr('x2', width)
        .attr('y2', y(0))

    svg.append('text')
        .attr('id', 'highscore-label')
        .attr('x', 50)
        .attr('y', 150)
        .text('High Score: ')

    svg.append('text')
        .attr('id', 'highscore')
        .attr('x', 140)
        .attr('y', 150)
        .text('0%')
}


export function chart_tick(data, val, avg, best) {

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
        d3.select('#highscore')
            .text(perc(avg.toFixed(2)))
    }
    if (avg > 1) {console.log(avg)};

    d3.select('#avg-line')
        .attr('y1', y(avg))
        .attr('y2', y(avg));
        
    // Pop the old data point off the front.
    data.shift();

}