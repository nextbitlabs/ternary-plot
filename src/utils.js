export function getAngleFromTicksPositions(ticksPositions) {
	const p = ticksPositions;
	const dy = p.slice(-1)[0][1] - p[0][1];
	const dx = p.slice(-1)[0][0] - p[0][0];
	return getAngle(dx, dy);
}

// Get the angle of a segment of width <dx> and height <dy> with the left vertice in [0, 0].
function getAngle(dx, dy) {
	if (dx > 0 && dy >= 0) {
		return Math.atan(dy / dx);
	}

	if (dx > 0 && dy < 0) {
		return Math.atan(dy / dx) + (Math.PI * 2);
	}

	if (dx < 0) {
		return Math.atan(dy / dx) + Math.PI;
	}

	if (dx === 0 && dy > 0) {
		return Math.PI / 2;
	}

	if (dx === 0 && dy < 0) {
		return Math.PI * (3 / 2);
	}

	// Default if both <dx> and <dy> are zero.
	return 0;
}
