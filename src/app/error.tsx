"use client" // Error components must be Client Components

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface IErrorView {
	error: Error & { digest?: string }
	reset: () => void
}

const ErrorView: React.FC<IErrorView> = ({ error, reset }) => {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2 py-8">
			<h2>Something went wrong!</h2>
			<Button
				variant="destructive"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</Button>
		</div>
	)
}

export default ErrorView
