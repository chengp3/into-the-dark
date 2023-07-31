import fishPng from './circle fish school.png'
import horizLogo from './gp_horiz_logo.png'
import favicon from './favicon.ico'
import './onload.js'
import css from "./styles.css";

export default function title () {
    let div = document.getElementById("sim");
    div.innerHTML = '';

    const introHTML = 
        `<div id="title">
        <div id="title-text">
            <img id="home-logo" class='top' src="./gp_horiz_logo.png" alt="GP logo">
            <h1 class='above-center' style='font-size:3em'>Swimming <br>in the Dark</h1>
            <h3 class='below-center' style='font-size:2em'>A simulation of fish <br>schooling behavior</h3>
            <h6 class='above-bottom'>Based on an <a href='https://www.complexity-explorables.org/explorables/into-the-dark/'><b><i>explorable</b></i></a> by Dirk Brockman, PhD</h6>
            <h6 class='bottom'>This Simulation Connects to Lesson 4 of our <a href="https://www.galacticpolymath.com/lessons/en-US/7">"Animal Collective"</a> mini-unit</h6>
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
    document.body.innerHTML = 
    `<div id="container" class="mw8 center fw w-100">    
        <img src="./gp_logo_gradient_transBG.png" alt="Galactic Polymath" id="overhead-logo" class="center">
        <div id="nav" class="mw8 center">
            <img src="./gp_logo_gradient_transBG.png" alt="Galactic Polymath" width="30" height="30" id="navigation-logo">
            <a href="#" class="nav-link nav0 wide-nav active-link" data-mode="0">0. Start</a>
            <a href="#" class="nav-link nav1 wide-nav" data-mode="1">1. Intro</a>
            <a href="#" class="nav-link nav2 wide-nav" data-mode="2">2. Groups</a>
            <a href="#" class="nav-link nav3 wide-nav" data-mode="3">3. Light</a>
            <a href="#" class="nav-link nav4 wide-nav" data-mode="4">4. Dark</a>
            <a href="#" class="nav-link nav5 wide-nav" data-mode="5">5. Experiment</a>
            <a href="#" class="nav-link nav0 mobile-nav active-link" data-mode="0">Start</a>
            <a href="#" class="nav-link nav1 mobile-nav" data-mode="1">Intro</a>
            <a href="#" class="nav-link nav2 mobile-nav" data-mode="2">Groups</a>
            <a href="#" class="nav-link nav3 mobile-nav" data-mode="3">Light</a>
            <a href="#" class="nav-link nav4 mobile-nav" data-mode="4">Dark</a>
            <a href="#" class="nav-link nav5 mobile-nav" data-mode="5">Experiment</a>
        </div>
        <div id="sim" class="mw8 center cf">
            <div id="title">
                <div id="title-text">
                    <img class='top' src="./gp_horiz_logo.png" alt="GP logo">
                    <h1 class='above-center' style='font-size:3em'>Swimming <br>in the Dark</h1>
                    <h3 class='below-center' style='font-size:2em'>A simulation of fish <br>schooling behavior</h3>
                    <h6 class='above-bottom'>Based on an <a href='https://www.complexity-explorables.org/explorables/into-the-dark/'><u><i>explorable</u></i></a> by Dirk Brockman, PhD</h6>
                    <h6 class='bottom'>This Simulation Connects to Lesson 4 of our <a href="https://www.galacticpolymath.com/lessons/en-US/7"><i><u>Animal Collective</i></u></a> mini-unit</h6>
                </div>
                <div id="fishdiv">
                        <img src="./circle fish school.png" alt="fish collective behavior" 
                            width="275" height="275"
                            class='fish ma4'>
                </div>
            </div>
        </div>
        <div id="backnext" class="center ma4">
            <div id="next" class="ph3 pv1 ba">
                <a href="#" data-mode="1" id='first-next'>Next</a>
            </div>
        </div>
    </div>
    `
}

init();
