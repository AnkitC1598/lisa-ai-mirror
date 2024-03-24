export const getType = (key: any): string =>
	Object.prototype.toString.call(key).slice(8, -1)

export const sleep = (delay: number = 1000) =>
	new Promise(resolve => setTimeout(resolve, delay))
