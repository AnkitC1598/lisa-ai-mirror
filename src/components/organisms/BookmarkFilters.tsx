"use client"

import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const BookmarkFilters = () => {
	const searchParams = useSearchParams()
	const filter: string = searchParams.get("filter") ?? "all"
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleFilterChange = (filter: string) => {
		const params = new URLSearchParams(searchParams)
		if (filter !== "all") params.set("filter", filter)
		else params.delete("filter")

		replace(`${pathname}?${params.toString()}`)
	}
	return (
		<>
			<div className="flex items-center gap-4">
				<span
					className={cn(
						"inline-flex h-6 cursor-pointer items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 ring-1 ring-inset ring-purple-600/20 transition-all duration-300 ease-in-out dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20",
						filter === "all"
							? "bg-purple-600 text-purple-100 dark:bg-purple-800 dark:text-purple-100"
							: "hover:bg-purple-600 hover:text-purple-100 dark:hover:bg-purple-800 dark:hover:text-purple-100"
					)}
					onClick={() => handleFilterChange("all")}
				>
					All
				</span>
				<span
					className={cn(
						"inline-flex h-6 cursor-pointer items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 ring-1 ring-inset ring-purple-600/20 transition-all duration-300 ease-in-out dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20",
						filter === "topics"
							? "bg-purple-600 text-purple-100 dark:bg-purple-800 dark:text-purple-100"
							: "hover:bg-purple-600 hover:text-purple-100 dark:hover:bg-purple-800 dark:hover:text-purple-100"
					)}
					onClick={() => handleFilterChange("topics")}
				>
					Topics
				</span>
				<span
					className={cn(
						"inline-flex h-6 cursor-pointer items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 ring-1 ring-inset ring-purple-600/20 transition-all duration-300 ease-in-out dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20",
						filter === "resources"
							? "bg-purple-600 text-purple-100 dark:bg-purple-800 dark:text-purple-100"
							: "hover:bg-purple-600 hover:text-purple-100 dark:hover:bg-purple-800 dark:hover:text-purple-100"
					)}
					onClick={() => handleFilterChange("resources")}
				>
					Resources
				</span>
				<span
					className={cn(
						"inline-flex h-6 cursor-pointer items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 ring-1 ring-inset ring-purple-600/20 transition-all duration-300 ease-in-out dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20",
						filter === "questions"
							? "bg-purple-600 text-purple-100 dark:bg-purple-800 dark:text-purple-100"
							: "hover:bg-purple-600 hover:text-purple-100 dark:hover:bg-purple-800 dark:hover:text-purple-100"
					)}
					onClick={() => handleFilterChange("questions")}
				>
					Questions
				</span>
			</div>
		</>
	)
}

export default BookmarkFilters
