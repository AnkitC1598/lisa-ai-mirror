"use server"

import { fetchClientWithToken } from "@/services/fetch"
import { IGlobalSearch } from "@/types/search"

export const globalSearch = async ({
	query,
}: {
	query: string
}): Promise<IGlobalSearch> => {
	const resp = await fetchClientWithToken(`/ai/slides/search?text=${query}`, {
		method: "GET",
	})

	return resp.results.data
}
