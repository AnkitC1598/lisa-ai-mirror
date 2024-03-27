"use server"

import { fetchClientWithBAT } from "@/services/fetch"

export const login = async (body: {
	orgId: string | null
	subDomain: string
}): Promise<{ jwt: string; refreshToken: string }> => {
	const resp = await fetchClientWithBAT("/auth/login/organization", {
		method: "POST",
		body: JSON.stringify(body),
	})

	return resp.results.data
}
