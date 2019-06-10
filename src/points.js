import {svg} from 'hybrids';

export function renderCircles(pointsCoordinates) {
	return pointsCoordinates.map(d => svg`
		<circle
			cx="${d[0]}"
			cy="${d[1]}"
			r=5
		></cirlce>
	`);
}

export const pointsCoordinates = {
	get: ({data, vertices}) => data.data.map(d => pointCoordinate(d, vertices))
};

function pointCoordinate(d, v) {
	return [
		(d.right * v[0][0]) + (d.bottom * v[1][0]) + (d.left * v[2][0]),
		(d.right * v[0][1]) + (d.bottom * v[1][1]) + (d.left * v[2][1])
	];
}
