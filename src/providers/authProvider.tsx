"use client"

import { login } from "@/actions/auth"
import { clientEnv } from "@/env/client"
import cookieService from "@/services/cookie"
import { addMinutes, fromUnixTime, isAfter } from "date-fns"
import { jwtDecode } from "jwt-decode"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface IAuthProvider {
	children: React.ReactNode
}

const AuthProvider: React.FC<Readonly<IAuthProvider>> = ({ children }) => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()

	const [ready, setReady] = useState<boolean>(false)

	useEffect(() => {
		if (window.location.pathname !== "/auth") {
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
							router.replace(pathname)
							setReady(true)
						})
						.catch((e: Error) => {
							cookieService.removeTokens()
							window.location.href = "/auth"
						})
				} else {
					cookieService.removeTokens()
					window.location.href = "/auth"
				}
			} else {
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
	}, [searchParams])

	return ready ? children : <>Loading...</>
}

export default AuthProvider
