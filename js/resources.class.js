/**
 * Resources class
 */
var Resources = function(game) {
	this.game = game;
	this.droprateModifier = 5;
	this.maxDrops = 3;
	this.types = [
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'food',
		'bonus',
		'bonus',
		'death',
		'death',
		'death',
		'faster',
		'faster',
		'faster',
		'slower',
		'slower'
	];
	this.defaultLifetime = {
		'food': null,
		'death': 180,
		'bonus': 100,
		'faster': 180,
		'slower': 180
	}
	this.locations = [];
}

Resources.prototype.checkLocation = function(x, y) {
	for (var i = 0; i < this.locations.length; i++) {
		if (this.locations[i][0] === x) {
			for (var i = 0; i < this.locations.length; i++) {
				if (this.locations[i][0] === x && this.locations[i][1] === y) {
					return this.locations[i][2];
				}
			}
		}
	}
	return null;
}

Resources.prototype.checkDropExpiration = function() {
	for (var i = 0; i < this.locations.length; i++) {
		if (this.locations[i][3] !== null) {
			if (this.locations[i][3] > 0) {
				this.locations[i][3]--;
			} else {
				this.despawnDrop(i);
			}
		}
	}
}

Resources.prototype.dropRandom = function() {
	if (!this.game.paused) {
		if (this.locations.length < this.maxDrops) {
			var randX = this.getRandomInt(0, this.game.grid.width - 1);
			var randY = this.getRandomInt(0, this.game.grid.height - 1);
			var randDrop = this.getRandomInt(0, this.types.length - 1);
			
			this.game.canvas.setTile(this.types[randDrop], randX, randY);
			
			this.locations.push([
				randX,
				randY,
				this.types[randDrop],
				this.defaultLifetime[this.types[randDrop]]
			]);
		}
	}
}

Resources.prototype.despawnDrop = function(i) {
	this.game.canvas.setTile('board', this.locations[i][0], this.locations[i][1]);
	this.locations.splice(i, 1);
}

Resources.prototype.removeDrop = function(x, y, despawn = false) {
	for (var i = 0; i < this.locations.length; i++) {
		if (this.locations[i][0] === x) {
			for (var i = 0; i < this.locations.length; i++) {
				if (this.locations[i][0] === x && this.locations[i][1] === y) {
					this.locations.splice(i, 1);
				}
			}
		}
	}
}

Resources.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}