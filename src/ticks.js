import {svg} from 'hybrids';
import {getAngleFromTicksPositions} from './utils';

export function renderTicks(ticks) {
	return ticks.map(d => svg`
		<line
			x1="${d[0][0]}"
			y1="${d[0][1]}"
			x2="${d[1][0]}"
			y2="${d[1][1]}"
		></line>
	`);
}

export const bottomTicksPositions = {
	get: ({vertices, numberOfTicks}) => {
		const v1 = vertices[1];
		const v2 = vertices[2];
		return thicksPositions(v1, v2, numberOfTicks);
	}
};

export const leftTicksPositions = {
	get: ({vertices, numberOfTicks}) => {
		const v1 = vertices[0];
		const v2 = vertices[1];
		return thicksPositions(v1, v2, numberOfTicks);
	}
};

export const rightTicksPositions = {
	get: ({vertices, numberOfTicks}) => {
		const v1 = vertices[2];
		const v2 = vertices[0];
		return thicksPositions(v1, v2, numberOfTicks);
	}
};

export const bottomTicks = {
	get: ({bottomTicksPositions, tickLenght}) =>
		getTicks(bottomTicksPositions, tickLenght)
};

export const rightTicks = {
	get: ({rightTicksPositions, tickLenght}) =>
		getTicks(rightTicksPositions, tickLenght)
};

export const leftTicks = {
	get: ({leftTicksPositions, tickLenght}) =>
		getTicks(leftTicksPositions, tickLenght)
};

function thicksPositions(v1, v2, N) {
	const v = [v2[0] - v1[0], v2[1] - v1[1]];
	return Array
		.from({length: N}, (_, i) => [
			v1[0] + ((v[0]) * (i / N)),
			v1[1] + ((v[1]) * (i / N))
		])
		.slice(1);
}

function getTicks(ticksPositions, l) {
	const a = getAngleFromTicksPositions(ticksPositions);
	const ticksExternalVerticePositions = ticksPositions
		.map(d => [d[0] + (l * Math.sin(a)), d[1] - (l * Math.cos(a))]);
	return ticksPositions
		.map((_, i) => [
			ticksPositions[i],
			ticksExternalVerticePositions[i]
		]);
}
