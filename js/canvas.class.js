/**
 * Canvas class
 */
var Canvas = function(game, canvasId) {
    this.game = game;
    this.canvas = document.getElementById(canvasId);
	this.context = this.canvas.getContext("2d");
	this.canvas.setAttribute('height', window.innerHeight);
	this.canvas.setAttribute('width', window.innerWidth);
	this.color = "lightgrey";
	this.clear();
    this.prep();
}

Canvas.prototype.drawAll = function() {
	for (var h = 0; h < this.game.grid.height; h++) {
		for (var w = 0; w < this.game.grid.width; w++) {
			this.context.fillStyle = this.color;
			this.context.fillRect(w * this.game.gridSize, h * this.game.gridSize, this.game.gridSize, this.game.gridSize);
			
			for (var i in this.game.snake.locations) {
				if (this.game.snake.locations[i][0] === w && this.game.snake.locations[i][1] === h) {
					this.context.fillStyle = "purple";
					this.context.fillRect(w * this.game.gridSize, h * this.game.gridSize, this.game.gridSize, this.game.gridSize);
				}
			}
		}
	}
}

Canvas.prototype.setTile = function(type, x, y) {
	switch (type) {
		case ('board'):
			this.context.fillStyle = this.color;
			break;
		case ('snake'):
			this.context.fillStyle = "purple";
			break;
		case ('food'):
			this.context.fillStyle = "green";
			break;
		case ('death'):
			this.context.fillStyle = "red";
			break;
		case ('faster'):
			this.context.fillStyle = "#708BF4";
			break;
		case ('slower'):
			this.context.fillStyle = "#3135C4";
			break;
		case ('bonus'):
			this.context.fillStyle = "gold";
			break;
		default:
			this.context.fillStyle = this.color;
			break;
	}
	this.context.fillRect(x * this.game.gridSize, y * this.game.gridSize, this.game.gridSize, this.game.gridSize);
}

Canvas.prototype.prep = function() {
    this.context.fillStyle = this.color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

Canvas.prototype.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}