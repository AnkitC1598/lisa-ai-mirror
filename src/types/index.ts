export type NonNullable<T> = {
	[K in keyof T]: Exclude<T[K], null>
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
