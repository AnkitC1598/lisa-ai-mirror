"use client"

import { Button } from "@/components/ui/button"
import * as Sentry from "@sentry/nextjs"
import { usePostHog } from "posthog-js/react"
import { useCallback, useEffect } from "react"

type TErrorWithDigest = Error & { digest?: string }

interface IGlobalError {
	error: TErrorWithDigest
	reset: () => void
}

const GlobalError: React.FC<IGlobalError> = ({ error, reset }) => {
	const posthog = usePostHog()

	const handleReset = () => {
		const globalResetAttempts = Number(
			localStorage.getItem("globalResetAttempts") || "0"
		)
		localStorage.setItem(
			"globalResetAttempts",
			(globalResetAttempts + 1).toString()
		)
		reset()
	}

	const handleResetOnMultipleErrors = () => {
		const globalResetAttempts = Number(
			localStorage.getItem("globalResetAttempts") || "0"
		)
		if (globalResetAttempts >= 2) {
			localStorage.setItem("globalResetAttempts", "0")
			window.location.reload()
		}
	}

	const reportError = useCallback(
		(error: TErrorWithDigest) => {
			posthog.capture("error", {
				error,
				from: "Error",
			})
			Sentry.captureException(error)
			console.error("Error:", error)
		},
		[posthog]
	)

	useEffect(() => {
		reportError(error)
		handleResetOnMultipleErrors()
	}, [error, reportError])

	return (
		<html>
			<body className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-neutral-50 py-8 text-gray-900 transition-all duration-300 ease-in-out dark:bg-neutral-950 dark:text-gray-200">
				<h2>Something went wrong!</h2>
				<Button
					variant="destructive"
					onClick={handleReset}
				>
					Try again
				</Button>
			</body>
		</html>
	)
}

export default GlobalError
