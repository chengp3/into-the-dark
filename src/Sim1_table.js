import * as d3 from "d3"

export default (agents) => {
    
    // Get your container
    let container = d3.select("#controls"); // Replace with your actual container


    // Generate the data for the table
    const colors = ["Red", "Blue", "Purple"]

    const speed = d3.scaleLinear()
        .domain([.1333, 3.1333])
        .range([1, 10])

    let tableData = agents.map(agent => ({
        Color: colors[agent.id],
        X: (agent.x/13).toFixed(0),
        Y: (10 - agent.y/13).toFixed(0),
        Angle: (agent.theta).toFixed(0),
        Speed: (speed(agent.speed)).toFixed(0)
    }));

    // Columns for the table
    let columns = ["Color", "X", "Y", "Angle", "Speed"];

    // Create table if it doesn't exist, or select it if it does
    let table = container.select("table");
    if (table.empty()) {
    table = container.append('table')
        .style('background-color', 'Gainsboro')
        .style('color', 'black')
        .style("border", "1px solid Gray")
        .style("width", "100%")
        .attr('id', 'sim1-table')
    
    // Append the table header
    let thead = table.append('thead');
    thead.append('tr')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(d => d);

    // Append the table body
    table.append('tbody');
    }

    // Select the table body
    let tbody = table.select('tbody');

    // Bind the data to the table rows, create new rows for new data, and remove old rows if necessary
    let rows = tbody.selectAll('tr')
    .data(tableData);

    rows.enter()
        .append('tr')
        .merge(rows)
        .selectAll('td')
        .data(row => columns.map(column => row[column]))
        .join('td')
        .text(d => d);

    rows.exit().remove();

}