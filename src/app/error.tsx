"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

type TErrorWithDigest = Error & { digest?: string }

interface IErrorView {
	error: TErrorWithDigest
	reset: () => void
}

const ErrorView: React.FC<IErrorView> = ({ error, reset }) => {
	const handleReset = () => {
		const resetAttempts = Number(
			localStorage.getItem("resetAttempts") || "0"
		)
		localStorage.setItem("resetAttempts", (resetAttempts + 1).toString())
		reset()
	}

	const handleResetOnMultipleErrors = () => {
		const resetAttempts = Number(
			localStorage.getItem("resetAttempts") || "0"
		)
		if (resetAttempts >= 2) {
			localStorage.setItem("resetAttempts", "0")
			window.location.reload()
		}
	}

	const reportError = (error: TErrorWithDigest) => {
		console.error("Error:", error)
	}

	useEffect(() => {
		handleResetOnMultipleErrors()
		reportError(error)
	}, [error])

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2 py-8">
			<h2>Something went wrong!</h2>
			<Button
				variant="destructive"
				onClick={handleReset}
			>
				Try again
			</Button>
		</div>
	)
}

export default ErrorView
