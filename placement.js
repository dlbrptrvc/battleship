let placement = new Placement();
let CPUPlacement = new Placement();
let AIPlayer = new Player();

rotateBtn.onclick = () => {
	rotateShip(placement);
};

startBtn.onclick = () => {
	placement = new Placement();
	CPUPlacement = new Placement();
	AIPlayer = new Player();
	populatePlacementBoard();
	populateCPUPlacementBoard();
	game = new Game(placement.board, CPUPlacement.board);
	info.textContent = 'Place your ships';
	generateBlankEnemyBoard();
	rotateBtn.style.display = 'inline';
};

function rotateShip(placement) {
	if (placement.shipSequence[placement.turn]) {
		placement.shipSequence[placement.turn].position.forEach((coord, index) => {
			placement.shipSequence[placement.turn].position[index] = coord
				.split(',')
				.reverse()
				.join();
		});
	}
}

function populatePlacementBoard() {
	placementGrid.replaceChildren();
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			let field = document.createElement('div');
			field.className = 'field';
			field.dataset.coord = i + ',' + j;
			field.addEventListener('mouseover', (event) => {
				let coord = event.target.dataset.coord;
				let squares = getSelectedSquares(coord, placement);
				if (squares) {
					squares.forEach((item) => {
						item.classList.add('shadow');
					});
				}
			});
			field.addEventListener('mouseleave', (event) => {
				let squares = document.querySelectorAll('.field');
				squares.forEach((square) => {
					square.classList.remove('shadow');
				});
			});
			field.addEventListener('click', (event) => {
				let squares = document.querySelectorAll('.shadow');
				let coords = [];
				if (squares.length > 0) {
					squares.forEach((item) => {
						coords.push(item.dataset.coord);
					});
					// add ship to the fleet
					let ship = placement.board.addShip(coords);
					// display ship
					squares.forEach((item) => {
						item.classList.remove('shadow');
						item.classList.add('boat');
					});
					// add occupied coords to placement
					coords.forEach((item) => {
						placement.occupiedSquares.add(item);
						getNeighbors(item).forEach((neig) => {
							placement.occupiedSquares.add(neig);
						});
					});
					// move on to the next boat
					placement.turn++;
					if (placement.turn >= placement.shipSequence.length) {
						rotateBtn.style.display = 'none';
						startGame();
					}
				}
			});
			placementGrid.append(field);
		}
	}
}

function getSelectedSquares(coord, place) {
	let ret = [];
	let coords = [];
	// get the coordinates of a potential boat
	if (place.shipSequence[place.turn]) {
		place.shipSequence[place.turn].position.forEach((item) => {
			coords.push(
				'' +
					(+coord.split(',')[0] + +item.split(',')[0]) +
					',' +
					(+coord.split(',')[1] + +item.split(',')[1])
			);
		});
	}

	let boardFit = true;
	let positionFit = true;
	// check if the positions can fit in the board
	coords.forEach((item) => {
		if (+item.split(',')[0] > 9) {
			boardFit = false;
		}
		if (+item.split(',')[1] > 9) {
			boardFit = false;
		}
	});
	// check if the positions aren't already taken
	coords.forEach((item) => {
		if (place.occupiedSquares.has(item)) {
			positionFit = false;
		}
	});
	// return elements coresponding to coords
	if (boardFit && positionFit) {
		coords.forEach((item) => {
			let square = document.querySelector('[data-coord="' + item + '"]');
			ret.push(square);
		});
		return ret;
	}
}

function getNeighbors(xy) {
	let ret = new Set();
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			ret.add(+xy.split(',')[0] + i + ',' + (+xy.split(',')[1] + j));
		}
	}
	return ret;
}

populatePlacementBoard();
populateCPUPlacementBoard();
let game = new Game(placement.board, CPUPlacement.board);
info.textContent = 'Place your ships';
generateBlankEnemyBoard();

function populateCPUPlacementBoard() {
	let rotation = 0;
	let available = false;
	let xy = '0,0';
	let shipXY = [];
	while (CPUPlacement.shipSequence.length > CPUPlacement.turn) {
		// pick a random rotation
		rotation = Math.floor(Math.random() * 2);
		if (rotation == 1) {
			rotateShip(CPUPlacement);
		}
		// pick a random coord
		available = false;
		while (!available) {
			shipXY = [];
			xy =
				'' +
				Math.floor(Math.random() * 10) +
				',' +
				Math.floor(Math.random() * 10);
			// check if it's squares are available
			available = true;
			CPUPlacement.shipSequence[CPUPlacement.turn].position.forEach((coord) => {
				shipXY.push(
					'' +
						(+coord.split(',')[0] + +xy.split(',')[0]) +
						',' +
						(+coord.split(',')[1] + +xy.split(',')[1])
				);
			});
			// check if they are less then 10 and if they are available
			shipXY.forEach((coord) => {
				if (+coord.split(',')[0] > 9 || +coord.split(',')[1] > 9) {
					available = false;
				}

				if (CPUPlacement.occupiedSquares.has(coord)) {
					available = false;
				}
			});
		}
		// if available place ship, make squares unavailable and go to the next one
		if (available) {
			CPUPlacement.board.addShip(shipXY);
			shipXY.forEach((item) => {
				CPUPlacement.occupiedSquares.add(item);
				getNeighbors(item).forEach((neig) => {
					CPUPlacement.occupiedSquares.add(neig);
				});
			});

			shipXY = [];
			CPUPlacement.turn++;
		}
	}
}

function generateBlankEnemyBoard() {
	enemyGrid.replaceChildren();
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			let field = document.createElement('div');
			field.className = 'field';
			field.dataset.coord = i + ',' + j;
			enemyGrid.append(field);
		}
	}
}
