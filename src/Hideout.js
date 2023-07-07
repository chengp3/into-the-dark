export default class Agent {
    constructor(id, params) {
        const theta = Math.random() * Math.PI * 2; // random angle
		this.id = id 
		this.x = Math.random() * params.L, // random horiz pos
		this.y = Math.random() * params.L, // random vert pos
		this.vx = params.speed_hideouts * Math.cos(theta), // horiz velocity
		this.vy = params.speed_hideouts * Math.sin(theta), // vert velocity
		this.r = params.size_hideouts // radius
        this.params = params
    }

    set_new_pos() {
        let dx =  this.params.dt * this.vx; // dx = displacement x
		let dy =  this.params.dt * this.vy; // dy = displacement y
		
		dx *= (this.id + 1) / 3;
		dy *= (this.id + 1) / 3;

		let x_new= (this.x + dx); // x_new = new x position
		let y_new= (this.y + dy); 
		
		if (x_new < 0 || x_new > this.params.L) {dx *= -1; this.vx*=-1}; // reverse direction
		if (y_new < 0 || y_new > this.params.L) {dy *= -1 ; this.vy*=-1}; // reverse direction

		this.x= (this.x + dx) // update position
		this.y= (this.y + dy) 
    }
}