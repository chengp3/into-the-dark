import logoPng from './gp_logo_gradient_transBG.png'
import * as d3 from 'd3';
import {each} from 'lodash-es'

let sim;

window.onload = function() {
    const navLinks = document.getElementsByClassName("nav-link");

    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function(e) {
            e.preventDefault();
            switchActive(this, navLinks);
            loadModule(+e.target.dataset.mode);
        });
    }

    const next = document.getElementById('first-next'); // only first link has id due to fix bug
    addBFListener(next, navLinks);
}

function switchActive (node, navLinks) {
    for (var j = 0; j < navLinks.length; j++) {
        navLinks[j].classList.remove('active-link');
    }
    node.classList.add('active-link');
}

function addBFListener (node, navLinks) {
    // add on-click to back/next buttons- navigation and active link highlighting
    node.addEventListener('click', function(e) {
        if (navLinks === undefined) {throw new Error('navLinks undefined')};
        const mode = +e.target.dataset.mode;
        e.preventDefault();

        const activeNode = document.getElementById('nav').children[mode + 1]
        switchActive(activeNode, navLinks);

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

    // Add Next link first (because of float right)
    if (mode < 5) {
        let newDiv = document.createElement("div");
        let newLink = document.createElement("a");
        newDiv.className = "fr ph3 pv1 ba mr5";
        newDiv.id = 'next';
        newLink.href = "#";
        newLink.dataset.mode = `${mode+1}`;
        newLink.textContent = "Next";

        newDiv.appendChild(newLink);
        backnext.appendChild(newDiv);
        addBFListener(document.getElementById('next').firstChild, navLinks);   
    }

    // Add Back link
    if (mode > 0) {
        let newDiv = document.createElement("div");
        let newLink = document.createElement("a");
        newDiv.className = "fr ph3 pv1 ba mr4 bg-dark-gray";
        newDiv.id = 'back';
        newLink.href = "#";
        newLink.className = 'white';
        newLink.dataset.mode = `${mode-1}`; // This sets a data attribute
        newLink.textContent = "Back";

        newDiv.appendChild(newLink);
        backnext.appendChild(newDiv);
        addBFListener(document.getElementById('back').firstChild, navLinks);
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