export interface IGlobalSearch {
	topics: ITopicsSearchResult[]
	chapters: IOthersSearchResult[]
	subjects: IOthersSearchResult[]
	terms: IOthersSearchResult[]
	cohorts: IOthersSearchResult[]
}

export interface ITopicsSearchResult {
	_id: string
	title: string
	details: string | null
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
}

export interface IOthersSearchResult {
	_id: string
	title: string
	uid: string
	details: string | null
}

export interface IGlobalSearchResult {
	topics: ITopicsSearchResult[]
	others: any[]
}
