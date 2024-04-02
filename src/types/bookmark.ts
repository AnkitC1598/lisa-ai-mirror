import { Resource } from "./topic"

export type TBookmarkType = "topic" | "resource" | "question"

export interface IBookmark {
	_id: string
	createdAt: string
	updatedAt: string
	topicId?: string
	cohortId?: string
	type: TBookmarkType
	resourceId?: string
	termId?: string
	subjectId?: string
	chapterId?: string
	body?:
		| Resource
		| {
				id: string
				question: string
				answer: string
		  }
	topic?: {
		_id: string
		title: string
		details: any
		priority: number
	}
}
