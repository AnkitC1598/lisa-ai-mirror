"use client"

import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { usePostHog } from "posthog-js/react"

interface IFilter {
	label: string
	id: string
}

const Filters: IFilter[] = [
	{
		label: "All",
		id: "all",
	},
	{
		label: "Topics",
		id: "topics",
	},
	{
		label: "Resources",
		id: "resources",
	},
	{
		label: "Questions",
		id: "questions",
	},
]

const BookmarkFilters = () => {
	const searchParams = useSearchParams()
	const filter: string = searchParams.get("filter") ?? "all"
	const pathname = usePathname()
	const { replace } = useRouter()

	const posthog = usePostHog()

	const handleFilterChange = (filter: string) => {
		posthog.capture("bookmark_filter", {
			type: filter,
		})
		const params = new URLSearchParams(searchParams)
		if (filter !== "all") params.set("filter", filter)
		else params.delete("filter")

		replace(`${pathname}?${params.toString()}`)
	}
	return (
		<>
			<div className="flex items-center gap-4">
				{Filters.map((filterOpt: IFilter) => (
					<span
						key={filterOpt.id}
						className={cn(
							"inline-flex h-6 cursor-pointer items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800 ring-1 ring-inset ring-neutral-600/20 transition-all duration-300 ease-in-out dark:bg-neutral-500/10 dark:text-neutral-400 dark:ring-neutral-500/20",
							filter === filterOpt.id
								? "bg-purple-100 text-purple-800 ring-purple-600/20 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20"
								: "hover:bg-purple-600 hover:text-purple-100 dark:hover:bg-purple-800 dark:hover:text-purple-100"
						)}
						onClick={() => handleFilterChange(filterOpt.id)}
					>
						{filterOpt.label}
					</span>
				))}
			</div>
		</>
	)
}

export default BookmarkFilters
