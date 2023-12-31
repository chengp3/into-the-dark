# Into the Dark!
### An educational simulation of fish written in javascript

Click [here](https://into-the-dark-gamma.vercel.app/) to check out the full deployment.

Changes: 
- Rewrote Agents, Hideouts, and Sims as classes for easier extensibility for separate units
- Refactored simulation parameters/logic files
- Added responsive navigation, back/forward buttons
- Removed wiggle and added Hideout velocity variation
- Customized slider logic and behaviors for all units, changed slider modules from d3-widgets to d3-simple-slider
- Added individual position and velocity display for unit 1
- Customized fish colors for unit 1
- Added axes labels for unit 1
- Added live updating chart "% fish hidden" for unit 5
- Rewrote unit 5 trials to last 30 seconds, with live refreshing scorekeeping chart tracking trials
- Rewrote unit 5 reset button
- Rewrote play/reset button 
- Added lesson text for all units
- Added responsive mobile support
- Added cookie support for trial data propagation

Dirk Brockmann original concept [sim](https://www.complexity-explorables.org/explorables/into-the-dark/)
