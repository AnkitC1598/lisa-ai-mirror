"use server"

import { fetchClientWithToken } from "@/services/fetch"
import { ICourse } from "@/types/hierarchy"

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
