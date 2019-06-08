import {html, svg, define} from 'hybrids';
import style from './style';

const margin = {
	get: () => ({top: 10, right: 10, bottom: 10, left: 10})
};

const width = {
	get: ({side, margin}) => side - margin.left - margin.right
};

const height = {
	get: ({side, margin}) => side - margin.top - margin.bottom
};

const center = {
	get: ({width, height}) => [width / 2, height / 2]
};

const radius = {
	get: ({width, height}) => {
		const scaleFactor = 1 / 2;
		return Math.min(width, height) * scaleFactor;
	}
};

// Eye-adjusted vertical shift
const shift = {
	get: ({radius}) => 0.8 * (radius * (1 - Math.sin(Math.PI / 6))) / 2
};

const globalTransform = {
	get: ({margin, shift}) => `translate(${margin.left}, ${margin.top + shift})`
};

// Vertices are sorted as [right, bottom, left].
const vertices = {
	get: ({radius, center}) => [0, Math.PI * (2 / 3), Math.PI * (4 / 3)]
		.map(angle => [
			center[0] + (radius * Math.sin(angle)),
			center[1] - (radius * Math.cos(angle))
		])
};

const borderPoints = {
	get: ({vertices}) => `
		${vertices[0][0]},${vertices[0][1]}
		${vertices[1][0]},${vertices[1][1]}
		${vertices[2][0]},${vertices[2][1]}
	`
};

const leftTicksPositions = {
	get: ({vertices, numberOfTicks}) => {
		const v1 = vertices[0];
		const v2 = vertices[1];
		return thicksPositions(v1, v2, numberOfTicks);
	}
};

const rightTicksPositions = {
	get: ({vertices, numberOfTicks}) => {
		const v1 = vertices[2];
		const v2 = vertices[0];
		return thicksPositions(v1, v2, numberOfTicks);
	}
};

const bottomTicksPositions = {
	get: ({vertices, numberOfTicks}) => {
		const v1 = vertices[1];
		const v2 = vertices[2];
		return thicksPositions(v1, v2, numberOfTicks);
	}
};

const bottomAxes = {
	get: ({leftTicksPositions, rightTicksPositions}) => {
		const p = leftTicksPositions;
		const q = [...rightTicksPositions].reverse();
		return p.map((_, i) => [p[i], q[i]]);
	}
};

const leftAxes = {
	get: ({bottomTicksPositions, rightTicksPositions}) => {
		const p = bottomTicksPositions;
		const q = [...rightTicksPositions].reverse();
		return p.map((_, i) => [p[i], q[i]]);
	}
};

const rightAxes = {
	get: ({leftTicksPositions, bottomTicksPositions}) => {
		const p = leftTicksPositions;
		const q = [...bottomTicksPositions].reverse();
		return p.map((_, i) => [p[i], q[i]]);
	}
};

const bottomTicks = {
	get: ({bottomTicksPositions, tickLenght}) =>
		getTicks(bottomTicksPositions, tickLenght)
};

const rightTicks = {
	get: ({rightTicksPositions, tickLenght}) =>
		getTicks(rightTicksPositions, tickLenght)
};

const leftTicks = {
	get: ({leftTicksPositions, tickLenght}) =>
		getTicks(leftTicksPositions, tickLenght)
};

const bottomLabels = {
	get: ({bottomTicksPositions, tickLenght}) =>
		getLabels(bottomTicksPositions, tickLenght * 2)
};

const rightLabels = {
	get: ({rightTicksPositions, tickLenght}) =>
		getLabels(rightTicksPositions, tickLenght * 2)
};

const leftLabels = {
	get: ({leftTicksPositions, tickLenght}) =>
		getLabels(leftTicksPositions, tickLenght * 2)
};

const transformBottomTitle = {
	get: ({vertices}) => `translate(
		${(vertices[1][0] + vertices[2][0]) / 2},
		${(vertices[1][1] + vertices[2][1]) / 2}
	)`
};

const bottomTitle = {
	get: ({data}) => `${data.titles.bottom}`
};

const transformRightTitle = {
	get: ({vertices}) => `translate(
		${(vertices[0][0] + vertices[1][0]) / 2},
		${(vertices[0][1] + vertices[1][1]) / 2}
	) rotate(60)`
};

const rightTitle = {
	get: ({data}) => `${data.titles.right}`
};

const transformLeftTitle = {
	get: ({vertices}) => `translate(
		${(vertices[2][0] + vertices[0][0]) / 2},
		${(vertices[2][1] + vertices[0][1]) / 2}
	) rotate(-60)`
};

const leftTitle = {
	get: ({data}) => `${data.titles.left}`
};

const pointsCoordinates = {
	get: ({data, vertices}) => data.data.map(d => pointCoordinate(d, vertices))
};

const step = {
	get: ({radius}) => (radius * Math.sqrt(3)) / 10
};

// TODO: does url(#ternary-pattern) work with shadow dom?
const pattern = {
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

function pointCoordinate(d, v) {
	return [
		(d.right * v[0][0]) + (d.bottom * v[1][0]) + (d.left * v[2][0]),
		(d.right * v[0][1]) + (d.bottom * v[1][1]) + (d.left * v[2][1])
	];
}

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

function getAngleFromTicksPositions(ticksPositions) {
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

function renderAxes(axes) {
	return axes.map(d => svg`
		<line
			x1="${d[0][0]}"
			y1="${d[0][1]}"
			x2="${d[1][0]}"
			y2="${d[1][1]}"
		></line>
	`);
}

function renderTicks(ticks) {
	return ticks.map(d => svg`
		<line
			x1="${d[0][0]}"
			y1="${d[0][1]}"
			x2="${d[1][0]}"
			y2="${d[1][1]}"
		></line>
	`);
}

function renderLabels(labels) {
	return labels.map(d => svg`
		<text
			x="${d.x}"
			y="${d.y}"
			dy=3
		>${d.text}</text>
	`);
}

function renderCircles(pointsCoordinates) {
	return pointsCoordinates.map(d => svg`
		<circle
			cx="${d[0]}"
			cy="${d[1]}"
			r=5
		></cirlce>
	`);
}

function render({globalTransform, borderPoints, bottomAxes, rightAxes, leftAxes, bottomTicks, rightTicks, leftTicks, bottomLabels, rightLabels, leftLabels, transformBottomTitle, bottomTitle, transformRightTitle, rightTitle, transformLeftTitle, leftTitle, pointsCoordinates, pattern}) {
	return html`
		${style}
		<svg width=400 height=400>
			<defs>${pattern}</defs>
			<g transform="${globalTransform}">
				<g class="ticks">
					<g class="bottom-ticks">${renderTicks(bottomTicks)}</g>
					<g class="bottom-ticks">${renderTicks(rightTicks)}</g>
					<g class="bottom-ticks">${renderTicks(leftTicks)}</g>
				</g>
				<g class="labels">
					<g class="bottom-labels">${renderLabels(bottomLabels)}</g>
					<g class="bottom-labels">${renderLabels(rightLabels)}</g>
					<g class="bottom-labels">${renderLabels(leftLabels)}</g>
				</g>
				<g class="titles">
					<g class="bottom-title" transform=${transformBottomTitle}>
						<text dx="10" dy="45">${bottomTitle}</text>
					</g>
					<g class="right-title" transform=${transformRightTitle}>
						<text dx="-10" dy="-40">${rightTitle}</text>
					</g>
					<g class="left-title" transform=${transformLeftTitle}>
						<text dx="-10" dy="-40">${leftTitle}</text>
					</g>
				</g>
				<g class="axes">
					<g class="bottom-axes">${renderAxes(bottomAxes)}</g>
					<g class="right-axes">${renderAxes(rightAxes)}</g>
					<g class="left-axes">${renderAxes(leftAxes)}</g>
				</g>
				<polygon
					class="border"
					points="${borderPoints}"
					fill="url(#ternary-pattern)"
				/>
				<g class="data">${renderCircles(pointsCoordinates)}</g>
			</g>
		</svg>
	`;
}

export const TernaryPlot = {
	side: 400,
	numberOfTicks: 10,
	tickLenght: 10,
	margin,
	width,
	height,
	center,
	radius,
	shift,
	globalTransform,
	vertices,
	borderPoints,
	bottomTicksPositions,
	rightTicksPositions,
	leftTicksPositions,
	bottomAxes,
	rightAxes,
	leftAxes,
	bottomTicks,
	rightTicks,
	leftTicks,
	bottomLabels,
	rightLabels,
	leftLabels,
	bottomTitle,
	transformBottomTitle,
	rightTitle,
	transformRightTitle,
	leftTitle,
	transformLeftTitle,
	pointsCoordinates,
	pattern,
	step,
	render
};

define('ternary-plot', TernaryPlot);
