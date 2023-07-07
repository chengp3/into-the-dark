import fishPng from './circle fish school.png'
import horizLogo from './gp_horiz_logo.png'
import './onload.js'
import css from "./styles.css";

export default function title () {
    let div = document.getElementById("sim");
    div.innerHTML = '';

    const introHTML = 
        `<div id="title">
        <div id="title-text">
            <img class='top' src="./gp_horiz_logo.png" alt="GP logo">
            <h1 class='above-center' style='font-size:3em'>Swimming <br>in the Dark</h1>
            <h3 class='below-center' style='font-size:2em'>A simulation of fish <br>schooling behavior</h3>
            <h6 class='bottom'>This Simulation Connects to Part 4 of GP's "Animal Collective" Lesson</h6>
        </div>
        <div id="fishdiv">
                <img src="./circle fish school.png" alt="fish collective behavior" 
                    width="275" height="275"
                    class='fish ma4'>
        </div>
    </div>`;

    div.innerHTML = introHTML;
}   
//<link rel="stylesheet" href="https://unpkg.com/tachyons/css/tachyons.min.css">`

function init () {
    document.head.innerHTML = 
        `<meta charset="utf-8">
		<title>Into the Dark</title>
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<link rel="shortcut icon" href="#" />
        <link rel="stylesheet" href="styles.css"></link>`
        
    
    document.body.innerHTML = 
    `<div id="container" class="mw8 center">    
        <div id="nav" class="mw8 center">
            <img src="./gp_logo_gradient_transBG.png" alt="Galactic Polymath" width="30" height="30">
            <a href="#" class="nav-link active-link" data-mode="0">0. Start</a>
            <a href="#" class="nav-link" data-mode="1">1. Intro</a>
            <a href="#" class="nav-link" data-mode="2">2. Groups</a>
            <a href="#" class="nav-link" data-mode="3">3. Light</a>
            <a href="#" class="nav-link" data-mode="4">4. Dark</a>
            <a href="#" class="nav-link" data-mode="5">5. Experiment</a>
        </div>
        <div id="sim" class="mw8 center cf">
            <div id="title">
                <div id="title-text">
                    <img class='top' src="./gp_horiz_logo.png" alt="GP logo">
                    <h1 class='above-center' style='font-size:3em'>Swimming <br>in the Dark</h1>
                    <h3 class='below-center' style='font-size:2em'>A simulation of fish <br>schooling behavior</h3>
                    <h6 class='bottom'>This Simulation Connects to Part 4 of GP's "Animal Collective" Lesson</h6>
                </div>
                <div id="fishdiv">
                        <img src="./circle fish school.png" alt="fish collective behavior" 
                            width="275" height="275"
                            class='fish ma4'>
                </div>
            </div>
        </div>
        <div id="backnext" class="bf-links mv3 fr pa2">
            <div id="next" class="fr ph3 pv1 ba mr5">
                <a href="#" data-mode="1" id='first-next'>Next</a>
            </div>
        </div>
    </div>
    `
}

init();
