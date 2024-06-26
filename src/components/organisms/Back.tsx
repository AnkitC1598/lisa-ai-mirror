"use client"

import { ArrowLeftIcon } from "@heroicons/react/16/solid"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const Back = () => {
	const router = useRouter()

	return (
		<>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => router.back()}
			>
				<ArrowLeftIcon className="h-6 w-6 shrink-0 opacity-70" />
			</Button>
		</>
	)
}

export default Back
