import logoPng from './gp_logo_gradient_transBG.png'
import {each} from 'lodash-es'

let sim;

window.onload = function() {
    const navLinks = document.getElementsByClassName("nav-link");

    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function(e) {
            const mode = +e.target.dataset.mode
            e.preventDefault();

            const activeNodes = document.getElementsByClassName(`nav${mode}`)
            switchActive(activeNodes, navLinks);
            loadModule(mode);
        });
    }

    const next = document.getElementById('first-next'); // only first link has id due to fix bug
    addBFListener(next, navLinks);
}

function switchActive (nodes, navLinks) {
    for (var j = 0; j < navLinks.length; j++) {
        navLinks[j].classList.remove('active-link');
    }
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.add('active-link');
    }
        
}

function addBFListener (node, navLinks) {
    // add on-click to back/next buttons- navigation and active link highlighting
    node.addEventListener('click', function(e) {
        if (navLinks === undefined) {throw new Error('navLinks undefined')};
        const mode = +e.target.dataset.mode;
        e.preventDefault();

        const activeNodes = document.getElementsByClassName(`nav${mode}`)
        switchActive(activeNodes, navLinks);

        loadModule(mode);
    });
}

function backNextLinks(mode, navLinks) {
    if (!navLinks) {throw new Error('navLinks undefined')};

    const back = document.getElementById('back');
    const next = document.getElementById('next');
    if (back) {back.remove()}
    if (next) {next.remove()}
    const backnext = document.getElementById('backnext');

    // Add Back link
    if (mode > 0) {
        let newDiv = document.createElement("div");
        let newLink = document.createElement("a");
        newDiv.className = "ph3 pv1 ba bg-dark-gray";
        newDiv.id = 'back';
        newLink.href = "#";
        newLink.className = 'white';
        newLink.dataset.mode = `${mode-1}`; 
        newLink.textContent = "Back";

        newDiv.appendChild(newLink);
        backnext.appendChild(newDiv);
        addBFListener(document.getElementById('back').firstChild, navLinks);
    }

    if (mode < 5) {
        let newDiv = document.createElement("div");
        let newLink = document.createElement("a");
        newDiv.className = "ph3 pv1 ba";
        newDiv.id = 'next';
        newLink.href = "#";
        newLink.dataset.mode = `${mode+1}`;
        newLink.textContent = "Next";

        newDiv.appendChild(newLink);
        backnext.appendChild(newDiv);
        addBFListener(document.getElementById('next').firstChild, navLinks);   
    }
}

function loadModule(mode) {
    if (typeof mode !== 'number' || mode < 0 || mode > 5) {
        throw new Error('Invalid value for mode');
    }

    // stop any prev d3 simulation ticking (or weird side effects happen)
    if (sim && sim.timer.stop) {
        sim.timer.stop()
    }

    const navLinks = document.getElementsByClassName("nav-link");
    backNextLinks(mode, navLinks);

    if (mode === 0) {
        import('./index.js')
            .then((module) => {
                module.default();
            })
            .catch((error) => {
                console.error(`Error loading module ${mode}: ${error}`);
            });
    }
    else {
        import(`./Sim${mode}.js`)
            .then((module) => {
                sim = module.default();
            })
            .catch((error) => {
                console.error(`Error loading module ${mode}: ${error}`);
            });
    }
}