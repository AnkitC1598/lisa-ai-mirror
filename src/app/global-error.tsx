"use client"

import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"

interface IGlobalError {
	error: Error & { digest?: string }
	reset: () => void
}

const GlobalError: React.FC<IGlobalError> = ({ error, reset }) => {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<html>
			<body className="flex h-full w-full flex-col items-center justify-center gap-2 py-8">
				<h2>Something went wrong!</h2>
				<button onClick={() => reset()}>Try again</button>
			</body>
		</html>
	)
}

export default GlobalError
