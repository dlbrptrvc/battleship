class Ship {
	constructor(position) {
		this.position = position;
		this.length = position.length;
		this.hitNo = 0;
		this.isSunk = false;
	}

	hit() {
		this.hitNo++;
		if (this.hitNo == this.length) {
			this.isSunk = true;
		}
	}

	check(coord) {
		if (this.position.includes(coord)) {
			return true;
		} else {
			return false;
		}
	}
}

class Gameboard {
	constructor() {
		this.ships = [];
		this.hits = new Set();
		this.misses = new Set();
		this.alive = true;
	}
	addShip(loc) {
		this.ships.push(new Ship(loc));
	}
	recieveAttack(str) {
		let hit = false;
		let sunk = false;
		let endGame = true;
		this.ships.forEach((ship) => {
			if (ship.check(str)) {
				hit = true;
				ship.hit();
				if (ship.isSunk == true) {
					sunk = true;
				}
			}
			if (ship.isSunk == false) {
				endGame = false;
			}
		});
		if (hit) {
			this.hits.add(str);
		} else {
			this.misses.add(str);
		}
		if (endGame) {
			this.alive = false;
		}
		return { hit: hit, sunk: sunk, end: endGame };
	}
}

class Game {
	constructor(board1, board2) {
		this.board = [board1, board2];
		this.turn = 0;
		this.winner = 'none';
	}
	isOver() {
		if (!player[1].alive) {
			this.winner = 0;
			return true;
		} else if (!player[0].alive) {
			this.winner = 1;
			return true;
		} else {
			return false;
		}
	}
}

class Placement {
	constructor() {
		this.shipSequence = [
			new Ship(['0,0', '0,1', '0,2', '0,3']),
			new Ship(['0,0', '0,1', '0,2']),
			new Ship(['0,0', '0,1', '0,2']),
			new Ship(['0,0', '0,1']),
			new Ship(['0,0', '0,1']),
			new Ship(['0,0', '0,1']),
		];
		this.board = new Gameboard();
		this.occupiedSquares = new Set();
		this.turn = 0;
	}
}

class Player {
	constructor() {
		this.grid = generateCoverGrid();
		this.empty = new Set();
		this.current = new Set();
		this.potential = new Set();
	}
}
