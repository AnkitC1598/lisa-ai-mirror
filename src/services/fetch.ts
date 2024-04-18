"use server"

import { clientEnv } from "@/env/client"
import { serverEnv } from "@/env/server"
import { cookies, headers } from "next/headers"

interface RequestOptions extends RequestInit {
	headers?: Record<string, string>
	noContentType?: boolean
	// Add more properties if needed
}

type TTokenType = "access" | "refresh" | "basic_access" | null

const getToken = (tokenType: TTokenType) => {
	const token = cookies().get(
		`${clientEnv.NEXT_PUBLIC_COOKIE_KEY}_${tokenType}`
	)
	if (!token) throw new Error(`Token ${tokenType} not found`)
	return token.value
}

const customFetch = async (
	baseUrl: string,
	endpoint: string,
	options: RequestOptions = { headers: {}, noContentType: false },
	tokenType: TTokenType = "access"
): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!options.noContentType) {
				if (
					options.headers &&
					options.headers.hasOwnProperty("Content-Type")
				)
					delete options.headers["Content-Type"]
				options.headers = {
					"Content-Type": "application/json",
					...options.headers,
				}
			}

			if (tokenType !== null) {
				const token = getToken(tokenType)

				options.headers = {
					...options.headers,
					Authorization: `Bearer ${token}`,
				}
			}
			let res = await fetch(`${baseUrl}${endpoint}`, options)

			if (!res.ok || res.status !== 200) {
				reject(
					new Error(
						`${baseUrl}${endpoint}: ${res.statusText}! Status: ${res.status}`
					)
				)
			}

			if (res.status === 401) {
				const newToken = await refreshToken()
				if (newToken) {
					options.headers = {
						...options.headers,
						Authorization: `Bearer ${newToken}`,
					}
					res = await fetch(`${baseUrl}${endpoint}`, options)
				} else {
					handleTokenRefreshFailure()
					reject(new Error("Token refresh failed"))
				}
			}

			resolve(await res.json())
		} catch (error) {
			reject(error)
		}
	})
}

const refreshToken = async () => {
	const token = getToken("refresh")
	const host = headers().get("host")
	const proto = headers().get("x-forwarded-proto") || "http"
	const hostname =
		host && !host.startsWith("localhost")
			? `${proto}://${host}`
			: process.env.MY_LOCAL_API_URL

	const resp = await fetch(serverEnv.ACCESS_PATH, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			refresh: token,
			subDomain: hostname,
		}),
	})

	if (resp.status === 200) {
		const newToken = await resp.json().then(data => data.jwt)
		cookies().set("token", newToken)
		return newToken
	}

	return null
}

const handleTokenRefreshFailure = () => {
	const cookieKey = clientEnv.NEXT_PUBLIC_COOKIE_KEY
	cookies().delete(`${cookieKey}_basic_access`)
	cookies().delete(`${cookieKey}_access`)
	cookies().delete(`${cookieKey}_refresh`)
	throw new Error("Invalid refresh token")
}

export const fetchClientWithBAT = (
	endpoint: string,
	options: RequestOptions = {}
) => customFetch(serverEnv.CLIENT_API_URL, endpoint, options, "basic_access")

export const fetchClientWithToken = (
	endpoint: string,
	options: RequestOptions = {}
) => customFetch(serverEnv.CLIENT_API_URL, endpoint, options, "access")

export const fetchClientWithoutToken = (
	endpoint: string,
	options: RequestOptions = {}
) => customFetch(serverEnv.CLIENT_API_URL, endpoint, options, null)

export const fetchAdminWithBAT = (
	endpoint: string,
	options: RequestOptions = {}
) => customFetch(serverEnv.ADMIN_API_URL, endpoint, options, "basic_access")

export const fetchAdminWithToken = (
	endpoint: string,
	options: RequestOptions = {}
) => customFetch(serverEnv.ADMIN_API_URL, endpoint, options, "access")

export const fetchAdminWithoutToken = (
	endpoint: string,
	options: RequestOptions = {}
) => customFetch(serverEnv.ADMIN_API_URL, endpoint, options, null)
