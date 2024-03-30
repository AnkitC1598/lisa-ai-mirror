export type NonNullable<T> = {
	[K in keyof T]: Exclude<T[K], null>
}
