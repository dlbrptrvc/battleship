function generateCoverGrid() {
	let odd = Math.floor(Math.random() * 2);
	let ret = new Set();
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if ((i + j) % 2 == odd) {
				ret.add('' + i + ',' + j);
			}
		}
	}
	return ret;
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
