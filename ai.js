function AIPlay() {
	let coord = '0,0';
	// if a player isnt currently engaged with a ship
	if (AIPlayer.current.size == 0) {
		let arr = Array.from(AIPlayer.grid);
		coord = arr[Math.floor(Math.random() * arr.length)];
		// if there are current boats pursued
	} else {
		let pots = Array.from(AIPlayer.potential);
		coord = pots[Math.floor(Math.random() * pots.length)];
	}
	AIPlayer.grid.delete(coord);
	AIPlayer.potential.delete(coord);
	AIPlayer.empty.add(coord);
	placementGrid.querySelector('[data-coord="' + coord + '"]').textContent = 'X';
	AIShoot(coord);
}

function AIShoot(coord) {
	let shot = game.board[0].recieveAttack(coord);
	// if a player misses
	if (shot.hit == false) {
		AIPlayer.empty.add(coord);
		game.turn = 0;
		// if a player hits a boat
	} else {
		// if the shot ended the game
		if (shot.end) {
			info.textContent = 'You lose!';
			// if the shot sank a boat
		} else {
			if (shot.sunk) {
				game.board[0].ships.forEach((ship) => {
					if (ship.isSunk) {
						ship.position.forEach((coor) => {
							AIPlayer.empty.add(getNeighbors(coor));
						});
					}
				});
				AIPlayer.empty.forEach((coor) => {
					AIPlayer.grid.delete(coor);
				});
				AIPlayer.current = new Set();
				AIPlayer.potential = new Set();
				AIPlay();
				// if the boat is still floating
			} else {
				AIPlayer.current.add(coord);
				AIPlayer.empty.add(
					+coord.split(',')[0] - 1 + ',' + (+coord.split(',')[1] - 1)
				);
				AIPlayer.empty.add(
					+coord.split(',')[0] - 1 + ',' + (+coord.split(',')[1] + 1)
				);
				AIPlayer.empty.add(
					+coord.split(',')[0] + 1 + ',' + (+coord.split(',')[1] - 1)
				);
				AIPlayer.empty.add(
					+coord.split(',')[0] + 1 + ',' + (+coord.split(',')[1] + 1)
				);
				AIPlayer.potential.add(
					+coord.split(',')[0] + ',' + (+coord.split(',')[1] + 1)
				);
				AIPlayer.potential.add(
					+coord.split(',')[0] + ',' + (+coord.split(',')[1] - 1)
				);
				AIPlayer.potential.add(
					+coord.split(',')[0] + 1 + ',' + +coord.split(',')[1]
				);
				AIPlayer.potential.add(
					+coord.split(',')[0] - 1 + ',' + +coord.split(',')[1]
				);
				AIPlayer.empty.forEach((coor) => {
					AIPlayer.potential.delete(coor);
					AIPlayer.grid.delete(coor);
				});
				AIPlay();
			}
		}
	}
}
