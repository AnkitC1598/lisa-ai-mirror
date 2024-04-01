import { ISVGIconProps } from "./svg"

export type TCurrentHierarchy = "ctsct" | "csct" | "cst" | "ct" | null
export type THierarchyType = "course" | "term" | "subject" | "chapter" | "topic"

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

export interface IHierarchy {
	prevLevel: ILevel
	currentLevel: ILevel
	ids: Record<string, string | null>
	currentView: string
	nextView: string | null
	idx: number
	hierarchyArr: string[]
	slug: string | string[] | undefined
	currentHierarchy: string | null
}

export interface ILevel {
	idType: string | null
	id: string | null
}

export interface ICourse {
	_id: string
	uid: string
	cohortId: string
	orgId: string
	status: string
	type: Array<string>
	attendance: {
		cohort: number
		terms: Record<string, number> | null
		subjects: Record<string, number> | null
		chapters: Record<string, number> | null
	}
	cohort: {
		_id: string
		title: string
		uid: string
		details: string | null
		mode: string
		coverImage: string | null
		icon: string | null
		type: Array<string>
		duration: {
			startDate: string
			endDate: string
		}
		dateRestriction: boolean
		contentCount: number
	}
}
