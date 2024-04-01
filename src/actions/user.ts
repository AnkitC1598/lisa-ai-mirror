"use server"

import { fetchClientWithToken } from "@/services/fetch"
import { IUser } from "@/types/user"

export const getUser = async (): Promise<IUser> => {
	const resp = await fetchClientWithToken("/user/profile", {
		method: "GET",
	})

	return resp.results.data
}
