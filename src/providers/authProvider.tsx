"use client"

import { login } from "@/actions/auth"
import { getUser } from "@/actions/user"
import Loading from "@/components/atoms/Loading"
import { clientEnv } from "@/env/client"
import cookieService from "@/services/cookie"
import useAIStore from "@/store"
import { IAccessToken } from "@/types/user"
import * as Sentry from "@sentry/nextjs"
import { addMinutes, fromUnixTime, isAfter } from "date-fns"
import { jwtDecode } from "jwt-decode"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { usePostHog } from "posthog-js/react"
import { useEffect, useState } from "react"

interface IAuthProvider {
	children: React.ReactNode
}

const AuthProvider: React.FC<Readonly<IAuthProvider>> = ({ children }) => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()

	const [ready, setReady] = useState<boolean>(false)

	const dispatch = useAIStore(store => store.dispatch)
	const posthog = usePostHog()

	useEffect(() => {
		if (window.location.pathname !== "/auth" && !ready) {
			let launchCode = searchParams.get("launchCode")
			if (launchCode)
				cookieService.setTokens({ basicAccessToken: launchCode })
			else launchCode = cookieService.getBasicAccessToken()

			if (launchCode) {
				let { exp = null } = jwtDecode(launchCode)

				if (
					exp === null ||
					isAfter(fromUnixTime(exp), addMinutes(new Date(), 1))
				) {
					login({
						orgId: null,
						subDomain:
							window.location.hostname === "localhost" ||
							window.location.hostname.includes("ngrok") ||
							window.location.hostname.includes("vercel")
								? clientEnv.NEXT_PUBLIC_APP_DOMAIN
								: window.location.hostname,
					})
						.then(({ jwt: accessToken, refreshToken }) => {
							cookieService.setTokens({
								accessToken,
								refreshToken,
							})
							const { orgId } = jwtDecode(
								accessToken
							) as IAccessToken

							getUser().then(user => {
								dispatch({
									type: "SET_USER",
									payload: user,
								})

								const userMetaData = {
									_id: user._id,
									uid: user.uid,
									fullname: user.fullname,
									email: user.email,
									username: user.username,
									orgId,
								}

								Sentry.setUser(userMetaData)
								posthog.identify(
									user.uid, // Replace 'distinct_id' with your user's unique identifier
									userMetaData // optional: set additional user properties
								)
								// posthog.group("org", window.location.host) // Paid Feature

								const userOnboarded = user.interestsAdded

								if (searchParams.has("launchCode"))
									if (
										!userOnboarded &&
										pathname !== "/onboarding"
									)
										router.replace("/onboarding")
									else router.replace(pathname)
								else if (
									!userOnboarded &&
									pathname !== "/onboarding"
								)
									router.replace("/onboarding")
								setTimeout(() => setReady(true), 500)
							})
						})
						.catch((error: Error) => {
							posthog.capture("error", {
								error,
								from: "authProvider",
							})
							console.error(error)
							cookieService.removeTokens()
							window.location.href = "/auth"
						})
				} else {
					console.error("launchCode expired")
					cookieService.removeTokens()
					window.location.href = "/auth"
				}
			} else {
				console.error("no launchCode found")
				cookieService.removeTokens()
				window.location.href = "/auth"
			}
		}

		const setDocHeight = () => {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty("--vh", `${vh}px`)
		}

		setDocHeight()
		window.addEventListener("resize", setDocHeight)

		return () => window.removeEventListener("resize", setDocHeight)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return ready ? (
		children
	) : (
		<div className="flex h-full w-full items-center justify-center py-8">
			<Loading icon />
		</div>
	)
}

export default AuthProvider
