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
		this.hits = [];
		this.misses = [];
		this.alive = true;
	}
	addShip(loc) {
		this.ships.push(new Ship(loc));
	}
	recieveAttack(str) {
		let hit = false;
		let endGame = true;
		this.ships.forEach((ship) => {
			if (ship.check(str)) {
				hit = true;
				ship.hit();
			}
			if (ship.isSunk == false) {
				endGame = false;
			}
		});
		if (hit) {
			this.hits.push(str);
		} else {
			this.misses.push(str);
		}
		if (endGame) {
			this.alive = false;
		}
	}
}

class Game {
	constructor() {
		this.player = (new Gameboard(), new Gameboard());
		this.phase = 'construction';
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
