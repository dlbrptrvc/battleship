function startGame() {
	info.textContent = 'Attack!';
	//initialize game mechanics
	// add onclick event to enemy fields
	let squares = enemyGrid.children;
	Array.from(squares).forEach((square) => {
		square.addEventListener('click', (event) => {
			// check if it's players turn
			// check if the square wasn't already selected
			let coord = event.target.dataset.coord;
			if (
				game.turn == 0 &&
				!game.board[1].hits.has(coord) &&
				!game.board[1].misses.has(coord)
			) {
				let shot = game.board[1].recieveAttack(coord);
				// log hit or miss
				if (shot.hit == false) {
					info.textContent = 'You missed.';
					game.board[1].misses.add(coord);
					event.target.textContent = 'X';
					game.turn = 1;
					AIPlay();
				}
				if (shot.hit == true) {
					info.textContent = 'Ship hit';
					game.board[1].hits.add(coord);
					event.target.classList.add('boat');
					event.target.textContent = 'X';
				}
				if (shot.sunk == true) {
					info.textContent = 'Ship hit, and sunk!';
				}
				if (shot.end == true) {
					info.textContent = 'Ship hit, and sunk! You win!';
				}

				// display hit or miss
				// if boat sunk log it and display
				// notify if boat was sunk
				// check for gameover
				// end turn
				// play for cpu
			}
		});
	});
}
