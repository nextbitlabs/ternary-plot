export const margin = {
	get: () => ({top: 10, right: 10, bottom: 10, left: 10})
};

export const width = {
	get: ({side, margin}) => side - margin.left - margin.right
};

export const height = {
	get: ({side, margin}) => side - margin.top - margin.bottom
};

export const center = {
	get: ({width, height}) => [width / 2, height / 2]
};

export const globalTransform = {
	get: ({margin, radius}) => {
		// Eye-adjusted vertical shift
		const shift = 0.8 * (radius * (1 - Math.sin(Math.PI / 6))) / 2;

		return `translate(${margin.left}, ${margin.top + shift})`;
	}
};
