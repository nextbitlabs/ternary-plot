import { html, define } from 'https://unpkg.com/hybrids/src';
import style from './style.js';

const margin = {
	get: () => ({top: 10, right: 10, bottom: 10, left: 10}),
}

export const TernaryPlot = {
	side: 400,
	margin,
	width: {
		get: ({side, margin}) => side - margin.left - margin.right,
	},
	height: {
		get: ({side, margin}) => side - margin.top - margin.bottom,
	},
	radius: {
		get: ({side}) => {
			const scaleFactor = 1 / 2;
			return side * scaleFactor;
		},
	},
	shift: {
		get: ({radius}) => {
			// Eye-adjusted vertical shift
			return 0.8 * (radius * (1 - Math.sin(Math.PI / 6))) / 2;
		}
	},
	globalTransform: {
		get: ({margin, shift}) => `translate(${margin.left}, ${margin.top + shift})`,
	},
	render
};

function render ({ globalTransform }) {
	return html`
		${style}
		<svg width=400 height=400>
			<g transform="${globalTransform}">
				<polygon class="border" points="${getBorderPoints()}"/>
			</g>
		</svg>
	`;
}

define('ternary-plot', TernaryPlot);

const margin1 = {top: 10, right: 10, bottom: 10, left: 10};
const width = 400 - margin1.left - margin1.right;
const height = 400 - margin1.top - margin1.bottom;
const numberOfTicks = 10;
const tickLenght = 10;

function getCenter() {
	return [width / 2, height / 2];
}

function getSide() {
	return Math.min(width, height);
}

function getRadius() {
	const side = getSide();
	const scaleFactor = 1 / 2;
	return side * scaleFactor;
}

function getVertices() {
	const radius = getRadius();
	const center = getCenter();

	// Vertices are sorted as [right, bottom, left].
	return [0, Math.PI * (2 / 3), Math.PI * (4 / 3)]
		.map(angle => [
			center[0] + (radius * Math.sin(angle)),
			center[1] - (radius * Math.cos(angle)),
		]);
}

function getBorderPoints() {
	const vertices = getVertices();

	return `
		${vertices[0][0]},${vertices[0][1]}
		${vertices[1][0]},${vertices[1][1]}
		${vertices[2][0]},${vertices[2][1]}`;
}
