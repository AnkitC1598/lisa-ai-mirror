"use server"

import { fetchClientWithToken } from "@/services/fetch"
import { IUser, IUserOnboarding } from "@/types/user"
import { revalidateTag } from "next/cache"

export const getUser = async (): Promise<IUser> => {
	const resp = await fetchClientWithToken("/user/profile", {
		method: "GET",
		next: { tags: ["user"] },
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
	const resp = await fetchClientWithToken("/user/profile", {
		method: "PUT",
		body: JSON.stringify(body),
	})
	revalidateTag("user")

	return resp
}
export const updateImage = async ({
	body,
	type = "profileImage",
}: {
	body: FormData
	type?: string
}): Promise<string> => {
	const resp = await fetchClientWithToken(`/user/${type}`, {
		method: "PUT",
		body,
		noContentType: true,
	})

	return resp.results.data[type]
}
