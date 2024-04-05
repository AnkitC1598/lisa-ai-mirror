"use server"

import { fetchClientWithToken } from "@/services/fetch"
import { IUser, IUserOnboarding } from "@/types/user"

export const getUser = async (): Promise<IUser> => {
	const resp = await fetchClientWithToken("/user/profile", {
		method: "GET",
	})

	return resp.results.data
}

export const onboardUser = async ({ body }: { body: IUserOnboarding }) => {
	await fetchClientWithToken("/user/profile/preference/update", {
		method: "PUT",
		body: JSON.stringify(body),
	})
}
