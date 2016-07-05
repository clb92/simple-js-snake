/**
 * Snake class
 */
var Snake = function(game) {
	this.game = game;
	this.length = 3;
	this.justEaten = 0;
	this.nextDirection = 'up';
	this.previousDirection = 'up';
	this.locations = [];
	for (var i = 0; i < this.length; i++) {
		this.locations[i] = [Math.floor(game.grid.width / 2), Math.floor(game.grid.height / 2) + i];
	}
}

Snake.prototype.changeDirection = function(direction = '') {
	if (direction !== '') {
		switch (this.previousDirection) {
			case ('up'):
				this.nextDirection = (direction === 'down' ? this.nextDirection : direction);
				break;
			case ('down'):
				this.nextDirection = (direction === 'up' ? this.nextDirection : direction);
				break;
			case ('left'):
				this.nextDirection = (direction === 'right' ? this.nextDirection : direction);
				break;
			case ('right'):
				this.nextDirection = (direction === 'left' ? this.nextDirection : direction);
				break;
		}
	}
}

Snake.prototype.move = function() {
	if (!this.game.paused && !this.game.gameover) {
		switch (this.nextDirection) {
			case ('up'):
				var newX = this.locations[0][0];
				var newY = this.locations[0][1] - 1;
				break;
			case ('down'):
				var newX = this.locations[0][0];
				var newY = this.locations[0][1] + 1;
				break;
			case ('left'):
				var newX = this.locations[0][0] - 1;
				var newY = this.locations[0][1];
				break;
			case ('right'):
				var newX = this.locations[0][0] + 1;
				var newY = this.locations[0][1];
				break;
			default:
				break;
		}
		this.previousDirection = this.nextDirection;
		
		if (newX > this.game.canvas.width) {
			newX = 1;
		}
		if (newX < this.game.canvas.width) {
			newX = this.game.canvas.width - 1;
		}
		if (newY > this.game.canvas.height) {
			newY = 1;
		}
		if (newY < this.game.canvas.height) {
			newY = this.game.canvas.height - 1;
		}
		
		var effect = this.game.resources.checkLocation(newX, newY);
		if (effect !== null) {
			this.game.applyEffect(effect);
		}
		
		for (var i = 0; i < this.locations.length; i++) {
			if (this.locations[i][0] === newX) {
				for (var i = 0; i < this.locations.length; i++) {
					if (this.locations[i][0] === newX && this.locations[i][1] === newY) {
						this.game.end();
					}
				}
			}
		}
		
		if (this.justEaten > 0) {
			this.justEaten--;
		} else {
			this.game.canvas.setTile('board', this.locations[this.locations.length - 1][0], this.locations[this.locations.length - 1][1]);
			this.locations.splice(this.locations.length - 1, 1);
		}
		
		this.locations.unshift([newX, newY]);
		this.game.canvas.setTile('snake', this.locations[0][0], this.locations[0][1]);
	}
}

Snake.prototype.embiggen = function(count) {
	this.justEaten = count;
}