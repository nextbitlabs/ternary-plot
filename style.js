import { html } from 'https://unpkg.com/hybrids/src';

export default html`
	<style>

		svg {
			border: 1px solid red;
		}

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

		svg .labels text {
			text-anchor: middle;
		}

		svg .titles text {
			font-size: 13px;
			font-weight: bold;
			text-anchor: middle;
		}

	</style>
`;
