import { ISVGIconProps } from "./svg"

export type TCurrentHierarchy = "ctsct" | "csct" | "cst" | "ct" | null
export type THierarchyType =
	| "course"
	| "term"
	| "subject"
	| "chapter"
	| "topic"
	| "default"

export interface IHierarchyConstantData {
	[key: string]: IHierarchyData
}

export interface IHierarchyData {
	icon: React.ComponentType<ISVGIconProps> | null
	colors: IColors
}

export interface IColors {
	card: ICard
	content: IContent
	form: IForm
}

export interface ICard {
	border: string
	icon: string
	bg: string
	text: string
}

export interface IContent {
	createIcon: string
	dataIcon: string
}

export interface IForm {
	bg: string
	text: string
	lightText: string
}
