import { html } from 'hybrids';

export default html`
	<style>

		svg .border {
			stroke: #353839;
			stroke-width: 5px;
			fill: none;
		}

		svg .axes line {
			fill: none;
			stroke: #eee;
			stroke-width: 1px;
		}

		svg .ticks {
			fill: none;
			stroke: #353839;
			stroke-width: 2px;
		}

		svg text {
			font-family: monospace;
			font-family: var(--font-family);
			fill: #353839;
		}

		svg .labels text {
			font-size: 10px;
			text-anchor: middle;
		}

		svg .titles text {
			font-size: 12px;
			font-size: var(--font-size);
			font-weight: bold;
			text-anchor: middle;
		}

		svg .data circle {
			fill: #353839;
		}

	</style>
`;
