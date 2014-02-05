console.log('anything');
(function(root) {
  Gravity = root.Gravity = (root.Gravity || {});

  SolarSystem = Gravity.SolarSystem = function (options) {
    var system = this;
	this.canvas = options.canvas
	console.log(this.canvas);
    this.ctx = options.space;
    this.planet = new Planet;
	this.moons = [new Moon({planet: this.planet, pos: [200, 200], vel: [0, 0], radius: 5, color: 'red', canvas: this.canvas})];
    setInterval(function() {system.step(system.ctx, system.trace)}, 40)
  }
  
  SolarSystem.prototype.step = function(ctx, tracer) {
    ctx.clearRect(0, 0, 1200, 900);
    this.planet.draw(ctx);
    this.moons.forEach(function(moon) {
	  if (moon.movable) {
	    moon.accelerate();
	    moon.move();
	    if (moon.tracing) {
	      moon.trace();
	    }
	  }
	  moon.draw(ctx);
	})
  }
  
  Planet = Gravity.Planet = function () {
    this.pos = [(1200 / 2), (900 / 2)]

    this.radius = 10;
    this.color = "blue";
	this.mass = 40;
  }

  Planet.prototype.draw = function(ctx) {
	
	
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
	  this.pos[0],
	  this.pos[1],
	  this.radius,
	  0,
	  2 * Math.PI,
	  false
    );

    ctx.fill();
  }
  
  Moon = Gravity.Moon = function (options) {
    this.canvas = options.canvas;
    this.tracer = document.createElement('canvas');
	var container = this.canvas.parentNode
	this.tracer.id = 'imageTrace';
    this.tracer.width = this.canvas.width;
	this.tracer.height = this.canvas.height;
	container.appendChild(this.tracer);
	this.ctx = this.tracer.getContext('2d');
    this.pos = options.pos;
	this.vel = options.vel;
	this.color = options.color;
	this.radius = options.radius;
	this.planet = options.planet;
	this.tracer = options.tracer
	this.movable = false;
	this.started = false;
	this.tracing = true;
  }
 
  Moon.prototype.accelerate = function() {
    var x_vector = this.planet.pos[0] - this.pos[0];
	var y_vector = this.planet.pos[1] - this.pos[1];
	var distance = (Math.sqrt((Math.pow(x_vector, 2) + Math.pow(y_vector, 2))));
	var normal_vector = [(x_vector / distance),(y_vector / distance)]
	var force = 100 * ((40) / (Math.pow(distance,2)));
    this.vel[0] += force * normal_vector[0];
	this.vel[1] += force * normal_vector[1];
  }
 
  Moon.prototype.move = function() {
    this.pos[0] += this.vel[0];
	this.pos[1] += this.vel[1];
  }
  
  Moon.prototype.trace = function() {
    if (!this.started) {
      this.ctx.beginPath();
	  this.ctx.moveTo(this.pos[0], this.pos[1]);
	  this.started = true;		  
	} else {
	  this.ctx.lineTo(this.pos[0], this.pos[1]);
	  this.ctx.stroke();
	}

  }
   
  Moon.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
	  this.pos[0],
	  this.pos[1],
	  this.radius,
	  0,
	  2 * Math.PI,
	  false
	);
	
	ctx.fill();
	

	
	ctx
  }
   
  



})(this);
