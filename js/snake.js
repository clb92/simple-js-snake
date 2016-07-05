var init = function () {
	var game = new Game();
	game.canvas.canvas.style.filter = "blur(40px)";
	game.canvas.drawAll();
	
	setTimeout(function(){
		document.getElementById("overlay").setAttribute("class", "hidden-overlay");
	}, 300);
	
	document.onkeydown = checkKey;
	function checkKey(e) {
		e = e || window.event;
		if (e.keyCode == '38') {		// up arrow
			game.snake.changeDirection((game.paused || game.gameover ? '' : 'up'));
		} else if (e.keyCode == '40') {	// down arrow
			game.snake.changeDirection((game.paused || game.gameover ? '' : 'down'));
		} else if (e.keyCode == '37') {	// left arrow
		   game.snake.changeDirection((game.paused || game.gameover ? '' : 'left'));
		} else if (e.keyCode == '39') {	// right arrow
			game.snake.changeDirection((game.paused || game.gameover ? '' : 'right'));
		} else if (e.keyCode == '32' || e.keyCode == '27' || e.keyCode == '80') {	// spacebar or escape or p
			if (!game.gameover) {
				game.togglePause();
			} else {
				location.reload();
			}
		}
	}
};

window.addEventListener('load', init);