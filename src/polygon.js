import {svg} from 'hybrids';

export const borderPoints = {
	get: ({vertices}) => `
		${vertices[0][0]},${vertices[0][1]}
		${vertices[1][0]},${vertices[1][1]}
		${vertices[2][0]},${vertices[2][1]}
	`
};

// Vertices are sorted as [right, bottom, left].
export const vertices = {
	get: ({radius, center}) => [0, Math.PI * (2 / 3), Math.PI * (4 / 3)]
		.map(angle => [
			center[0] + (radius * Math.sin(angle)),
			center[1] - (radius * Math.cos(angle))
		])
};

export const radius = {
	get: ({width, height}) => {
		const scaleFactor = 1 / 2;
		return Math.min(width, height) * scaleFactor;
	}
};

export const step = {
	get: ({radius}) => (radius * Math.sqrt(3)) / 10
};

export const pattern = {
	get: ({width, height, step, radius}) => svg`
		<pattern
			id="ternary-pattern"
			patternUnits="userSpaceOnUse"
			patternTransform="translate(
				${(width / 2) + (step / 2)}, ${(height / 2) - radius}
			)"
			width="${2 * step}"
			height="${Math.sqrt(3) * step}"
		>
			<rect
				fill="rgba(0, 0, 0, 0.1)"
				width="${2 * step}"
				height="${Math.sqrt(3) * step}">
			></rect>
			<polygon
				fill="rgba(0, 0, 0, 0.1)"
				points="
					0,${(Math.sqrt(3) / 2) * step}
					${2 * step},${(Math.sqrt(3) / 2) * step}
					${1.5 * step},0
					${Number(step)},${(Math.sqrt(3) / 2) * step}
					${0.5 * step},0"
			></polygon>
			<polygon
				fill="rgba(0, 0, 0, 0.1)"
				points="
					0,${Math.sqrt(3) * step}
					${2 * step},${Math.sqrt(3) * step}
					${2 * step}, ${(Math.sqrt(3) / 2) * step}
					${1.5 * step},${Math.sqrt(3) * step}
					${Number(step)},${(Math.sqrt(3) / 2) * step}
					${0.5 * step},${Math.sqrt(3) * step}
					0, ${(Math.sqrt(3) / 2) * step}"
			></polygon>
		</pattern>
	`
};
