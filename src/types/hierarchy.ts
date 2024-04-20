import { ISVGIconProps } from "./svg"

export type TCurrentHierarchy = "ctsct" | "csct" | "cst" | "ct" | null
export type THierarchyType = "course" | "term" | "subject" | "chapter" | "topic"
export type TCohortHierarchyType =
	| "cohort"
	| "term"
	| "subject"
	| "chapter"
	| "topic"

export interface IHierarchyConstant {
	[key: string]: IHierarchyConstantData
}

export interface IHierarchyConstantData {
	icon: React.ComponentType<ISVGIconProps> | null
	colors: IColors
}

export interface IColors {
	card: ICard
	content: IContent
	form: IForm
	badge: string
	peek: {
		border: string
		bg: string
	}
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

export interface IHierarchyInfo {
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
	type: string[]
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
		type: string[]
		duration: {
			startDate: string
			endDate: string
		}
		dateRestriction: boolean
		contentCount: number
	}
}

export interface ITopic {
	_id: string
	createdAt: string
	updatedAt: string
	title: string
	details: string | null
	orgId: string
	cohortId: string
	cohort: {
		_id: string
		title: string
		uid: string
		details: string | null
		mode: string
		coverImage: string | null
		icon: string | null
		type: string[]
		duration: {
			startDate: string
			endDate: string
		}
		dateRestriction: boolean
		contentCount: number
	}
	[key: string]: any
}

export interface IHierarchy {
	_id: string
	createdAt: string
	updatedAt: string
	title: string
	uid: string
	details: string | null
	mode: string
	status: string
	coverImage: string | null
	icon: string | null
	type: string[]
	duration: {
		startDate: string
		endDate: string
	}
	dateRestriction: boolean
	contentCount: number
	hierarchy: string[]
	children: {
		_id: string
		createdAt: string
		updatedAt: string
		createdBy: {
			uid: string
			fullname: string
			email: string
			username: string
			profileImage: string
		}
		updatedBy: {
			uid: string
			fullname: string
			email: string
			username: string
			profileImage: string
		}
		title: string
		details?: string
		orgId: string
		mode: string
		status: string
		coverImage: any
		priority: number
		startDate: string
		endDate: string
		contentCount: number
	}[]
	attendance: {
		cohort: number
		terms: Record<string, number> | null
		subjects: Record<string, number> | null
		chapters: Record<string, number> | null
	}
	[key: string]: any
}

export interface IDriveFile {
	_id: string
	createdAt: string
	updatedAt: string
	url: string
	title: string
	cohortId: string
	orgId: string
	isVisible: boolean
	fileType?: string
}

export interface IPagination {
	total: number
	next: number
	previous: number
}
