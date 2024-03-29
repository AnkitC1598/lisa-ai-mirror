"use server"

import { fetchClientWithToken } from "@/services/fetch"
import { ICourse } from "@/types/hierarchy"

export const getCourses = async (): Promise<ICourse[]> => {
	const resp = await fetchClientWithToken("/cohort", {
		method: "GET",
	})

	return resp.results.data
}
