import {svg} from 'hybrids';
import {getAngleFromTicksPositions} from './utils';

export function renderLabels(labels) {
	return labels.map(d => svg`
		<text
			x="${d.x}"
			y="${d.y}"
			dy=3
		>${d.text}</text>
	`);
}

export const bottomLabels = {
	get: ({bottomTicksPositions, tickLenght}) =>
		getLabels(bottomTicksPositions, tickLenght * 2)
};

export const rightLabels = {
	get: ({rightTicksPositions, tickLenght}) =>
		getLabels(rightTicksPositions, tickLenght * 2)
};

export const leftLabels = {
	get: ({leftTicksPositions, tickLenght}) =>
		getLabels(leftTicksPositions, tickLenght * 2)
};

function getLabels(ticksPositions, l) {
	const a = getAngleFromTicksPositions(ticksPositions);
	const ticksExternalVerticePositions = ticksPositions
		.map(d => [d[0] + (l * Math.sin(a)), d[1] - (l * Math.cos(a))])
		.reverse(); // Set the right labels order.
	return ticksPositions
		.map((_, i) => ({
			x: ticksExternalVerticePositions[i][0],
			y: ticksExternalVerticePositions[i][1],
			text: `${(i * 10) + 10}`
		}));
}
