export default function setup_modal() {
    const sim = document.getElementById('sim')
    const newDiv = document.createElement("div")
    newDiv.id = 'modal'
    const modal = sim.appendChild(newDiv)

    modal.innerHTML = 
    `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h1 style='color:rgb(38, 34, 144)'>Who's Afraid of the <s>Dark</s> Light?</h1>
      <p>Now that you understand this simulation and have a hypothesis \
      about how variable(s) control how the school finds its way to \
      the dark and stays there, let's put it to the test.</p> 
      <p>Run an experiment. A graph will show you the average \
      proportion of the time fish spent in the light versus the dark. \
      Every fraction of a second, the proportion of fish in the \
      dark/light is calculated. The average of this proportion over \
      the last 30 seconds will show up as a horizontal gray \
      line in the plot.</p>
      <p>Use this curve to guide your exploration of Relative Speed, \
      Alignment, and Attraction Radius. </p>
      <p>Run as many trials as you like and try to maximize Percentage \
      in the Dark over 30 seconds! <b>Stay alive!</b></p>
    </div>`

    const span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
}

