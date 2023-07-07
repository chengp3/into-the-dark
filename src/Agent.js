import {rad2deg, deg2rad, dist} from "./utils"
import {filter, meanBy} from "lodash-es"

export default class Agent {
    constructor(id, hideouts, params) {
        this.params = params;
        this.id = id;
        this.x = Math.random() * params.L; // random num from 0-1
        this.y = Math.random() * params.L; 
        this.theta = Math.random() * 360; // random num of degrees
        this.speed_var = (1+Math.random()*params.speed_variation);
		
		this.ishidden = params.dark_zones == true && filter(hideouts, h => dist(this, h) < h.r ).length ? 1 : 0;
		//this.t_dark = this.ishidden ? 1 : 0;

		this.speed = this.adjust_speed(hideouts);
    }
    
    adjust_angle(agents) {
        let colliders = [];
		var wanted_x,wanted_y;
		var theta_orient;
		var theta_attract;
      			
		colliders = filter(agents,d=>{
			return (dist(this,d) < this.params.collision_radius) && (d.id != this.id); // all within collision radius
		})	
		
		if(colliders.length>0) {		
			
			wanted_x = this.x - meanBy(colliders,d => d.x); // mean of all colliders' positions
			wanted_y = this.y - meanBy(colliders,d => d.y);			
			
		} else {
			
			//const vx = Math.cos(deg2rad(a.theta)); // horizontal component of velocity
			//const vy = Math.sin(deg2rad(a.theta)); // vertical component of velocity
			//const vabs = Math.sqrt(vx*vx + vy*vy); // = 1 ????

			const neighbors = filter(agents,d => {
				let dx = d.x-this.x; 	// horiz distance from a to d
				let dy = d.y-this.y;   // vert distance from a to d
				d.r = Math.sqrt(dx*dx+dy*dy);   // set d.r to absolute distance from a to d
				//let sight = (dx*vx + dy*vy) / (vabs * d.r);		// ?????

				return (d.r < this.params.attraction_radius  &&  d.id!=this.id)
			})

		// now we separate them into the agents to align with and those to be attracted to

			const alignors = filter(neighbors,d => d.r < this.params.alignment_radius)
			const attractors = filter(neighbors,d => d.r > this.params.alignment_radius)
			
			theta_orient = this.theta;
			theta_attract = this.theta;


			// calculate alignors cumulative direction
			if (alignors.length > 0 && this.params.collective_behavior){
				const mx = meanBy(alignors,x=> Math.cos(deg2rad(x.theta)))
				const my = meanBy(alignors,x=> Math.sin(deg2rad(x.theta)))
				theta_orient = rad2deg(Math.atan2(my,mx));
			} 
		
			// calculate direction to attractors' cumulative position
			if (attractors.length > 0 && this.params.collective_behavior){
				const mx = meanBy(attractors,d => d.x)
				const my = meanBy(attractors,d => d.y)
				theta_attract = rad2deg(Math.atan2(my-this.y,mx-this.x));
			} 
				
			// average the previous two angles
			wanted_x = 0.5*( Math.cos(deg2rad(theta_orient)) + Math.cos(deg2rad(theta_attract)))
			wanted_y = 0.5*( Math.sin(deg2rad(theta_orient)) + Math.sin(deg2rad(theta_attract)))
		}
		
		// angular_increment is a dampener on angular change i guess ?
		const new_x = Math.cos(deg2rad(this.theta)) +  this.params.angular_increment * wanted_x;
		const new_y = Math.sin(deg2rad(this.theta)) +  this.params.angular_increment * wanted_y;

		const w = (self.t_dark + self.t_light) % 3 == 0 ? this.params.wiggle : 0;

		const theta = rad2deg(Math.atan2(new_y,new_x)) + (Math.random() -  0.5) * w;
		return theta;
    }

    adjust_speed(hideouts) {
        if (this.params.dark_zones == true) {
            this.ishidden = filter(hideouts, h => dist(this, h) < h.r ).length ? 1 : 0;
            //if (ishidden) this.t_dark += 1;
        } else {
            return this.params.speed_in_the_light
        }

        // v = velocity      if not in hideout || darkzones are off, set to in_light speed. else set to in_dark speed
        const v = this.ishidden ? this.params.speed_in_the_dark : this.params.speed_in_the_light;
        return v
    }

    set_new_pos(agents, hideouts) {
        this.theta = this.adjust_angle(agents);
        this.speed = this.adjust_speed(hideouts);

		const phi = deg2rad(this.theta);
		let dx =  this.params.dt * this.speed * this.speed_var * Math.cos(phi);
		let dy =  this.params.dt * this.speed * this.speed_var * Math.sin(phi);

		let x_new = (this.x + dx);
		let y_new = (this.y + dy);

		// this takes care of the boundaries
		if (x_new < 0 || x_new > 128) dx *= -1;
		if (y_new < 0 || y_new > 128) dy *= -1;

		this.x = (this.x + dx);
		this.y = (this.y + dy);
		
		this.theta = rad2deg(Math.atan2(dy,dx));
    }   

}