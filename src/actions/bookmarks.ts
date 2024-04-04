"use server"

import { fetchClientWithToken } from "@/services/fetch"
import { IBookmark } from "@/types/bookmark"
import { IPracticeQuestion, Resource } from "@/types/topic"
import { revalidatePath } from "next/cache"

export const getBookmarks = async ({
	page,
	filter,
}: {
	page: number
	filter: string | null
}): Promise<IBookmark[]> => {
	const resp = await fetchClientWithToken(
		`/ai/slides/bookmarks?page=${page}&limit=15`,
		{
			method: "GET",
		}
	)
	return resp.results.data
}

export const addTopicBookmark = async ({
	cohortId,
	topicId,
}: {
	cohortId: string
	topicId: string
}) => {
	const resp = await fetchClientWithToken(
		`/ai/slides/bookmark/add/${cohortId}/${topicId}`,
		{
			method: "POST",
		}
	)
	return resp.code
}

export const removeTopicBookmark = async ({
	cohortId,
	topicId,
}: {
	cohortId: string
	topicId: string
}) => {
	const resp = await fetchClientWithToken(
		`/ai/slides/bookmark/remove/${cohortId}/${topicId}`,
		{
			method: "DELETE",
		}
	)
	return resp.code
}

export const addResourceBookmark = async ({
	cohortId,
	topicId,
	body,
}: {
	cohortId: string
	topicId: string
	body: Resource
}) => {
	const resp = await fetchClientWithToken(
		`/ai/slides/bookmark/add/${cohortId}/${topicId}/resource`,
		{
			method: "POST",
			body: JSON.stringify({ ...body, type: "resource" }),
		}
	)
	revalidatePath("/bookmarks")
	return resp.code
}

export const removeResourceBookmark = async ({
	cohortId,
	topicId,
	resourceId,
}: {
	cohortId: string
	topicId: string
	resourceId: string
}) => {
	const resp = await fetchClientWithToken(
		`/ai/slides/bookmark/remove/${cohortId}/${topicId}/resource/${resourceId}`,
		{
			method: "DELETE",
		}
	)
	revalidatePath("/bookmarks")
	return resp.code
}

export const addQuestionBookmark = async ({
	cohortId,
	topicId,
	body,
}: {
	cohortId: string
	topicId: string
	body: IPracticeQuestion
}) => {
	const resp = await fetchClientWithToken(
		`/ai/slides/bookmark/add/${cohortId}/${topicId}/question`,
		{
			method: "POST",
			body: JSON.stringify(body),
		}
	)
	return resp.code
}

export const removeQuestionBookmark = async ({
	cohortId,
	topicId,
	questionId,
}: {
	cohortId: string
	topicId: string
	questionId: string
}) => {
	const resp = await fetchClientWithToken(
		`/ai/slides/bookmark/remove/${cohortId}/${topicId}/question/${questionId}`,
		{
			method: "DELETE",
		}
	)
	return resp.code
}
