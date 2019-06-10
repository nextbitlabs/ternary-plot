export const transformBottomTitle = {
	get: ({vertices}) => `translate(
		${(vertices[1][0] + vertices[2][0]) / 2},
		${(vertices[1][1] + vertices[2][1]) / 2}
	)`
};

export const bottomTitle = {
	get: ({data}) => `${data.titles.bottom}`
};

export const transformRightTitle = {
	get: ({vertices}) => `translate(
		${(vertices[0][0] + vertices[1][0]) / 2},
		${(vertices[0][1] + vertices[1][1]) / 2}
	) rotate(60)`
};

export const rightTitle = {
	get: ({data}) => `${data.titles.right}`
};

export const transformLeftTitle = {
	get: ({vertices}) => `translate(
		${(vertices[2][0] + vertices[0][0]) / 2},
		${(vertices[2][1] + vertices[0][1]) / 2}
	) rotate(-60)`
};

export const leftTitle = {
	get: ({data}) => `${data.titles.left}`
};
