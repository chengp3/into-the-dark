var restData = (function() {

  var data = [];

  for (var i = 62; i > 0; i--) {
    data.push(produceValue(i));
  }

  function produceRestData() {
    data.push(produceValue());

    while (data.length > 62) {
      data.shift();
    }
  }

  var lastProducedValue;

  function produceValue(currentTick) {
    var newNumber;
    if (!lastProducedValue) {
      lastProducedValue = Math.random() * 10;
    } else {
      if (lastProducedValue > 9) {
        lastProducedValue -= Math.random() * 2;
      } else if (lastProducedValue < 1) {
        lastProducedValue += Math.random() * 2;
      } else {
        lastProducedValue += Math.random() * 3 - 1.5;
      }
    }

    return [currentTick, lastProducedValue];
  }

  function getData() {
    return data;
  }

  return {
    getData: getData,
    produceRestData: produceRestData
  }
})();

var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 470 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

document.addEventListener("DOMContentLoaded", function() {

  var data = restData.getData();
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d[0]; }))
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([0, 10])
    .range([height, 0]);

  var yAxis = d3.axisLeft(y);

  var line = d3.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

  window.update = function() {
    restData.produceRestData();
    data = restData.getData();
    
    x.domain(d3.extent(data, function(d) { return d[0]; }));

    svg.select(".line")
      .attr("d", line)
      .attr("transform", null)
      .transition()
      .duration(950)
      .ease(d3.easeLinear)
      .attr("transform", "translate(" + (x(0) - x(1)) + ")");
  };
});
