/**
 * Game class
 */
var Game = function() {
	this.gameover = false;
	this.started = false;
	this.paused = true;
	this.gameLoop = null;
	this.gameLoopCount = 0;
	this.score = 0;
	this.speedNormal = 80;
	this.speedModifierNormal = 1;
	this.speedModifier = 1;
	this.effects = {
		bonus: 0,
		speedChange: 0
	};
	this.gridSize = 20;
	this.grid = {
		width: 0,
		height: 0
	};
	this.sounds = {
		food: new Audio("audio/food.wav"),
		bonus: new Audio("audio/bonus.wav"),
		death: new Audio("audio/death3.wav"),
		speedUp: new Audio("audio/speedUp.wav"),
		speedDown: new Audio("audio/speedDown.wav"),
		pause: new Audio("audio/pause.wav"),
		start: new Audio("audio/test.wav")
	}
	for (var sound in this.sounds) {
		if (this.sounds.hasOwnProperty(sound)) {
			this.sounds[sound].load();
			console.log('Loaded: ' + this.sounds[sound].src);
		}
	}
	this.canvas = new Canvas(this, "gameCanvas");
	this.initGrid();
	this.snake = new Snake(this);
	this.resources = new Resources(this);
}

Game.prototype.initGrid = function() {
	this.grid.width = Math.floor(this.canvas.canvas.width / this.gridSize);
	this.grid.height = Math.floor(this.canvas.canvas.height / this.gridSize);
}

Game.prototype.start = function() {
	//this.sounds.start.play();
	this.paused = false;
	this.started = true;
	/* var parent = this;
	this.gameLoop = setInterval(function(){
		parent.gameLoopCount++;
		if (parent.gameLoopCount % (100 / parent.resources.droprateModifier) === 0 || parent.gameLoopCount === 1) {
			parent.resources.dropRandom();
		}
		if (parent.effects.speedChange > 0) {
			parent.effects.speedChange--;
		} else {
			parent.speedModifier = parent.speedModifierNormal;
		}
		parent.update();
	}, 80 / this.speedModifier); */
	
	var parent = this;
	var interval = this.speedNormal / this.speedModifier;

	function gameLoop() {
		if (!parent.paused) {
			parent.gameLoopCount++;
			if (parent.gameLoopCount % (150 / parent.resources.droprateModifier) === 0 || parent.gameLoopCount === 1) {
				parent.resources.dropRandom();
			}
			if (parent.effects.speedChange > 0) {
				parent.effects.speedChange--;
			} else {
				parent.speedModifier = parent.speedModifierNormal;
			}
			parent.update();
		}
		interval = parent.speedNormal / parent.speedModifier;
		setTimeout(gameLoop, interval);
	}
	setTimeout(gameLoop, interval);
}

Game.prototype.update = function() {
	this.snake.move();
	this.writeScore();
	this.resources.checkDropExpiration();
}

Game.prototype.togglePause = function() {
	this.paused = (this.paused ? false : true);
	this.sounds.pause.play();
	if (this.paused) {
		//clearInterval(this.gameLoop);
		this.canvas.canvas.style.filter = "blur(40px)";
		this.canvas.canvas.style.WebkitFilter = "blur(40px)";
		document.getElementById("popup-text").textContent = "Paused!";
		document.getElementById("popup-text").removeAttribute("class");
	} else {
		this.canvas.canvas.style.filter = "blur(0px)";
		this.canvas.canvas.style.WebkitFilter = "blur(0px)";
		document.getElementById("popup-text").setAttribute("class", "hidden");
		if (!this.started) {
			this.start();
		}
	}
}

Game.prototype.applyEffect = function(effect) {
	console.log("Effect pickup: " + effect);
	switch (effect) {
		case ('food'):
			this.sounds.food.play();
			this.score++;
			this.snake.embiggen(1);
			break;
		case ('death'):
			this.end();
			break;
		case ('faster'):
			this.sounds.speedUp.play();
			this.speedModifier = 1.7;
			this.effects.speedChange = 180;
			break;
		case ('slower'):
			this.sounds.speedDown.play();
			this.speedModifier = .6;
			this.effects.speedChange = 100;
			break;
		case ('bonus'):
			this.sounds.bonus.play();
			this.score = this.score + 15;
			this.snake.embiggen(6);
			break;
	}
}

Game.prototype.writeScore = function() {
	document.getElementById("score").textContent = this.score + " points";
}

Game.prototype.end = function() {
	this.sounds.death.play();
	this.gameover = true;
	clearInterval(this.gameLoop);
	this.canvas.canvas.style.transition = "all 1s ease-out";
	this.canvas.canvas.style.MozTransition = "all 1s ease-out";
	this.canvas.canvas.style.WebkitTransition = "all 1s ease-out";
	this.canvas.canvas.style.filter = "blur(20px)";
	this.canvas.canvas.style.WebkitFilter = "blur(20px)";
	document.getElementById("score").style.filter = "blur(20px)";
	document.getElementById("score").style.WebkitFilter = "blur(20px)";
	document.getElementById("popup-text").innerHTML = "Game over!<br><br><small>Score: " + this.score + "</small>";
	document.getElementById("popup-text").removeAttribute("class");
}