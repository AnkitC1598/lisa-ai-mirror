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

export const updateUser = async ({ body }: { body: IUser }) => {
	await fetchClientWithToken("/user/profile", {
		method: "PUT",
		body: JSON.stringify(body),
	})
}
export const updateImage = async ({
	body,
	type = "profileImage",
}: {
	body: FormData
	type?: string
}) => {
	return fetchClientWithToken(`/user/${type}`, {
		method: "PUT",
		body,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})
}
