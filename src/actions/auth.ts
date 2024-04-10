"use server"

import { clientEnv } from "@/env/client"
import { fetchClientWithBAT } from "@/services/fetch"
import { cookies } from "next/headers"

export const login = async (body: {
	orgId: string | null
	subDomain: string
}): Promise<{ jwt: string; refreshToken: string }> => {
	let resp = await fetchClientWithBAT("/auth/login/organization", {
		method: "POST",
		body: JSON.stringify(body),
	})

	resp = resp.results.data

	cookies().set(`${clientEnv.NEXT_PUBLIC_COOKIE_KEY}_access`, resp.jwt)
	cookies().set(
		`${clientEnv.NEXT_PUBLIC_COOKIE_KEY}_refresh`,
		resp.refreshToken
	)

	return resp
}
