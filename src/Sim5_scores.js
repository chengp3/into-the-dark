import {format} from 'd3';

const perc = format(".0%");

export function setupScores () {
    const scoreDiv = document.createElement('div');
    scoreDiv.setAttribute('id', 'scoreTable');
    document.getElementById('controls').appendChild(scoreDiv);

    let table = document.createElement('table');
    let headers = ['Avg Speed Setting', 'Avg Alignment Setting', 'Avg Attraction Setting', 'Avg % Fish In The Dark'];
    
    let headerRow = document.createElement('tr');
    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    
    table.appendChild(headerRow);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    let row = document.createElement('tr');
    for(let j = 0; j < headers.length; j++) {
        let cell = document.createElement('td');
        cell.textContent = ' ';
        row.appendChild(cell);
    }
    tbody.appendChild(row);
    
    scoreDiv.appendChild(table);
}

export function updateTable (res) {
    let tbody = document.getElementsByTagName('tbody')[0];
    const data = res[res.length - 1];

    if (res.length > 1) {
        let row = document.createElement('tr');
        for(let j = 0; j < 4; j++) {
            let cell = document.createElement('td');
            if (j == 3) {
                cell.textContent = perc(data[j + 1]);}
            else {
                cell.textContent = data[j + 1];
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    else {
        const cells = document.getElementsByTagName('td');
        for(let j = 0; j < 4; j++) {
            if (j == 3) {
                cells[j].textContent = perc(data[j + 1]);
            }
            else {cells[j].textContent = data[j];}
        }
    }
}