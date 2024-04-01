"use server"

import { fetchClientWithToken } from "@/services/fetch"
import { ICourse, ITopic } from "@/types/hierarchy"
import { Resource } from "@/types/topic"

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
	query,
}: {
	hierarchy: string
	cohortId: string
	idType: string
	id: string
	query: string
}) => {
	const resp = await fetchClientWithToken(
		`/cohort/${cohortId}/${hierarchy}s?id=${id}&idType=${idType}`,
		{
			method: "GET",
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

	return resp.results.data.resources.web.results
}
