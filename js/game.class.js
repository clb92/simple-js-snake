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
	this.resources.checkDropExpiration();
}

Game.prototype.togglePause = function() {
	this.paused = (this.paused ? false : true);
	if (this.paused) {
		//clearInterval(this.gameLoop);
		this.canvas.canvas.style.filter = "blur(40px)";
		document.getElementById("popup-text").textContent = "Paused!";
		document.getElementById("popup-text").removeAttribute("class");
	} else {
		this.canvas.canvas.style.filter = "blur(0px)";
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
			console.log("food");
			this.score++;
			this.snake.embiggen(1);
			break;
		case ('death'):
			console.log("death");
			this.end();
			break;
		case ('faster'):
			console.log("faster");
			this.speedModifier = 1.7;
			this.effects.speedChange = 180;
			break;
		case ('slower'):
			console.log("slower");
			this.speedModifier = .6;
			this.effects.speedChange = 100;
			break;
		case ('bonus'):
			console.log("bonus");
			this.score = this.score + 15;
			this.snake.embiggen(6);
			break;
	}
	console.log(this);
}

Game.prototype.end = function() {
	this.gameover = true;
	clearInterval(this.gameLoop);
	this.canvas.canvas.style.transition = "all 1s ease-out";
	this.canvas.canvas.style.filter = "blur(20px)";
	document.getElementById("popup-text").textContent = "Game over!";
	document.getElementById("popup-text").removeAttribute("class");
}