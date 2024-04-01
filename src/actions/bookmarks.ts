"use server"

import { fetchClientWithToken } from "@/services/fetch"
import { ITopic } from "@/types/hierarchy"

export const getBookmarks = async ({
	page,
}: {
	page: number
}): Promise<{ _id: string; topic: ITopic }[]> => {
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
