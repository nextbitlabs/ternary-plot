import {html, define} from 'hybrids';
import style from './style';
import {
	width,
	height,
	margin,
	center,
	globalTransform
} from './layout';
import {
	borderPoints,
	vertices,
	radius,
	step,
	pattern
} from './polygon';
import {
	renderCircles,
	pointsCoordinates
} from './points';
import {
	renderTicks,
	bottomTicksPositions,
	rightTicksPositions,
	leftTicksPositions,
	bottomTicks,
	rightTicks,
	leftTicks
} from './ticks';
import {
	renderLabels,
	bottomLabels,
	rightLabels,
	leftLabels
} from './labels';
import {
	bottomTitle,
	rightTitle,
	leftTitle,
	transformBottomTitle,
	transformRightTitle,
	transformLeftTitle
} from './titles';
import {
	renderAxes,
	bottomAxes,
	rightAxes,
	leftAxes
} from './axes';

function render({
	globalTransform,
	borderPoints,
	bottomAxes,
	rightAxes,
	leftAxes,
	bottomTicks,
	rightTicks,
	leftTicks,
	bottomLabels,
	rightLabels,
	leftLabels,
	transformBottomTitle,
	bottomTitle,
	transformRightTitle,
	rightTitle,
	transformLeftTitle,
	leftTitle,
	pointsCoordinates,
	pattern,
	side
}) {
	return html`
		${style}
		<svg width=${side} height=${side}>
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
