import {svg} from 'hybrids';

export function renderAxes(axes) {
	return axes.map(d => svg`
		<line
			x1="${d[0][0]}"
			y1="${d[0][1]}"
			x2="${d[1][0]}"
			y2="${d[1][1]}"
		></line>
	`);
}

export const bottomAxes = {
	get: ({leftTicksPositions, rightTicksPositions}) => {
		const p = leftTicksPositions;
		const q = [...rightTicksPositions].reverse();
		return p.map((_, i) => [p[i], q[i]]);
	}
};

export const leftAxes = {
	get: ({bottomTicksPositions, rightTicksPositions}) => {
		const p = bottomTicksPositions;
		const q = [...rightTicksPositions].reverse();
		return p.map((_, i) => [p[i], q[i]]);
	}
};

export const rightAxes = {
	get: ({leftTicksPositions, bottomTicksPositions}) => {
		const p = leftTicksPositions;
		const q = [...bottomTicksPositions].reverse();
		return p.map((_, i) => [p[i], q[i]]);
	}
};
