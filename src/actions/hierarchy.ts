"use server"

import { fetchClientWithToken } from "@/services/fetch"
import { ICourse, IHierarchy, ITopic } from "@/types/hierarchy"
import {
	IChatResponse,
	IPracticeQuestion,
	ISlides,
	Resource,
} from "@/types/topic"

export const getCourses = async (): Promise<ICourse[]> => {
	const resp = await fetchClientWithToken("/cohort", {
		method: "GET",
	})

	return resp.results.data
}

export const getCourse = async ({
	cohortId,
}: {
	cohortId: string
}): Promise<ICourse> => {
	const resp = await fetchClientWithToken(`/cohort/${cohortId}`, {
		method: "GET",
	})

	return resp.results.data
}

export const getHierarchyData = async ({
	hierarchy,
	cohortId,
	idType,
	id,
}: {
	hierarchy: string
	cohortId: string
	idType: string
	id: string
}): Promise<IHierarchy> => {
	const resp = await fetchClientWithToken(
		`/cohort/${cohortId}/${hierarchy}s?id=${id}&idType=${idType}`,
		{
			method: "GET",
			...(hierarchy === "topic" ? { cache: "no-store" } : {}),
		}
	)

	return resp.results.data
}

export const getTopicDetails = async ({
	topicId,
}: {
	topicId: string
}): Promise<ITopic> => {
	const resp = await fetchClientWithToken(`/cohort/topic/${topicId}`, {
		method: "GET",
	})

	return resp.results.data
}

export const getSlides = async ({
	courseId,
	topicId,
}: {
	courseId: string
	topicId: string
}): Promise<ISlides> => {
	const resp = await fetchClientWithToken(
		`/ai/slides/${courseId}/${topicId}`,
		{
			method: "GET",
		}
	)

	return resp.results.data
}

export const getTranslations = async ({
	courseId,
	topicId,
	langCode,
}: {
	courseId: string
	topicId: string
	langCode: string
}): Promise<any> => {
	const resp = await fetchClientWithToken(
		`/ai/slides/translate/${topicId}/${courseId}/${langCode}`,
		{
			method: "GET",
		}
	)
	return resp.results.data
}

export const answerQuiz = async ({
	courseId = "",
	topicId = "",
	langCode = "",
	questionId = "",
	answerId = "",
}) => {
	const resp = await fetchClientWithToken(
		`/ai/slides/quiz/answer/${courseId}/${topicId}/${langCode}/${questionId}/${answerId}`,
		{
			method: "PUT",
		}
	)
	return resp
}

export const getResources = async ({
	courseId,
	topicId,
}: {
	courseId: string
	topicId: string
}): Promise<Resource[]> => {
	const resp = await fetchClientWithToken(
		`/ai/resources/${courseId}/${topicId}`,
		{
			method: "GET",
		}
	)
	return resp.results.data.resources
}

export const getQuestions = async ({
	courseId,
	topicId,
}: {
	courseId: string
	topicId: string
}): Promise<{
	questions: IPracticeQuestion[]
} | null> => {
	const resp = await fetchClientWithToken(
		`/ai/questions/${courseId}/${topicId}`,
		{
			method: "GET",
		}
	)

	return resp.results.data
}

export const getChats = async ({
	courseId,
	topicId,
}: {
	courseId: string
	topicId: string
}): Promise<IChatResponse[]> => {
	const resp = await fetchClientWithToken(
		`/ai/chat/${courseId}/${topicId}?page=1&limit=10`,
		{
			method: "GET",
		}
	)

	return resp.results.data
}

export const translateSlides = async ({
	courseId,
	topicId,
	langCode,
}: {
	courseId: string
	topicId: string
	langCode: string
}): Promise<ISlides> => {
	const resp = await fetchClientWithToken(
		`/ai/slides/translate/${topicId}/${courseId}/${langCode}`,
		{
			method: "PUT",
		}
	)

	return resp.results.data
}

export const recordSlideDuration = async ({
	courseId,
	topicId,
	slideId,
	body,
}: {
	courseId: string
	topicId: string
	slideId: string
	body: {
		timeSpent: number
		langCode?: string
		isLastSlide: boolean
	}
}) => {
	const resp = await fetchClientWithToken(
		`/ai/slides/duration/${courseId}/${topicId}/${slideId}`,
		{
			method: "PUT",
			body: JSON.stringify(body),
		}
	)
	return resp
}

export const getRecentTopics = async (): Promise<ITopic | null> => {
	const resp = await fetchClientWithToken(`/ai/recent/topic`, {
		method: "GET",
	})

	return resp.results.data
}
