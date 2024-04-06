export type Resource = {
	id: string
	title: string
	url: string
	is_source_local: boolean
	is_source_both: boolean
	description: string
	profile: {
		name: string
		url: string
		long_name: string
		img: string
	}
	language: string
	family_friendly: boolean
	type: string
	subtype: string
	meta_url: {
		scheme: string
		netloc: string
		hostname: string
		favicon: string
		path: string
	}
	thumbnail?: {
		src: string
		original: string
		logo: boolean
	}
	bookmarked?: boolean
}

export interface IPracticeQuestion {
	id?: string
	question: string
	answer: string
	bookmarked?: boolean
}

export interface ISlides {
	_id: string
	createdAt: string
	updatedAt: string
	uid: string
	slides: { [key: string]: ISlideSet }
	completed: boolean
	topic: ITopic
}

interface ITopic {
	_id: string
	title: string
	details: string | null
	priority: number
}

export interface ISlideSet {
	createdAt: Date | string | number
	language: string
	slides: ISlide[]
}

export interface ISlide {
	id?: string
	type: string
	title?: string
	body?: string
	question?: string
	completed?: boolean
	feedback?: string
	duration?: {
		timeSpent: number
		createdAt: Date | string | number
	}[]
	priority: number
	answers?: IAnswer[]
	userAnswer?: string | null
	correctAnswer?: string
}

export interface IAnswer {
	id: string
	body: string
	isCorrect: boolean
}

export interface IChatResponse {
	_id: string
	body: string
	isLisaAi: boolean
	createdAt: Date
}

export interface IChat {
	id: string
	content: string
	role: "user" | "assistant"
	createdAt: Date
}
