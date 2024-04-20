"use client"

import { globalSearch } from "@/actions/search"
import { IGlobalSearchResult } from "@/types/search"
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"
import { usePathname } from "next/navigation"
import { usePostHog } from "posthog-js/react"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Button } from "../ui/button"
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command"
import { Skeleton } from "../ui/skeleton"
import HierarchyCard from "./HierarchyCard"

interface ISearchMenu {
	size?: string
	hideOnHome?: boolean
}

const SearchMenu: React.FC<ISearchMenu> = ({
	size = "small",
	hideOnHome = false,
}) => {
	const [open, setOpen] = useState<boolean>(false)
	const [query, setQuery] = useState<string | undefined>()
	const [results, setResults] = useState<IGlobalSearchResult>({
		topics: [],
		others: [],
	})
	const [loading, setLoading] = useState<boolean>(false)
	const pathname = usePathname()

	const posthog = usePostHog()

	const handleQuery = useDebouncedCallback(async (query: string) => {
		setQuery(query)

		posthog.capture("global_search", {
			query,
		})
		setLoading(true)
		const results = await globalSearch({ query })
		setLoading(false)
		setResults({
			topics: results.topics,
			others: Object.entries(results)
				.filter((_, i) => Object.keys(results)[i] !== "topics")
				.flatMap(([key, value]) =>
					value.map((item: any) => ({
						type: key.replace(/s\b/g, ""),
						...item,
					}))
				),
		})
	}, 500)

	useEffect(() => {
		if (!open) {
			setQuery(undefined)
			setResults({
				topics: [],
				others: [],
			})
		}
	}, [open])

	if (hideOnHome && pathname === "/" && size === "small") return null

	return (
		<>
			<Button
				variant={
					size === "small"
						? "ghost"
						: size === "large"
							? "outline"
							: null
				}
				size={size === "small" ? "icon" : "default"}
				onClick={() => setOpen(true)}
				className={size === "large" ? "w-full justify-start gap-2" : ""}
			>
				<MagnifyingGlassIcon
					className={
						size === "large"
							? "h-5 w-5 shrink-0 opacity-50"
							: "h-6 w-6 opacity-70"
					}
				/>
				{size === "large" ? (
					<span className="text-gray-400">
						Search any topic from your curriculum
					</span>
				) : null}
			</Button>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
			>
				<CommandInput
					onValueChange={handleQuery}
					placeholder="Search any topic from your curriculum"
				/>
				<CommandList>
					{loading ? (
						<div className="flex w-full flex-col items-center justify-center gap-2 p-4">
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
						</div>
					) : (
						query &&
						!results.topics.length &&
						!results.others.length && (
							<CommandEmpty>No results found.</CommandEmpty>
						)
					)}
					{results.topics.length && query ? (
						<CommandGroup heading="Topics">
							{results.topics.map(topic => (
								<CommandItem
									key={topic._id}
									asChild
									value={"topic_" + topic._id}
									className="!p-0"
								>
									<HierarchyCard
										type="topic"
										showHierarchy
										peekIndex={50}
										cohortId={topic.cohortId}
										hierarchy={topic}
										onClick={() => setOpen(false)}
										from="globalSearch"
									/>
								</CommandItem>
							))}
						</CommandGroup>
					) : null}
					{/* {query && results.topics.length && results.others.length ? (
						<CommandSeparator alwaysRender />
					) : null} */}
					{results.others.length && query ? (
						<CommandGroup heading="Others">
							{results.others.map(other => (
								<CommandItem
									key={other.type + "_" + other._id}
									value={other.type + "_" + other._id}
									asChild
									className="!p-0"
								>
									<HierarchyCard
										makeRoute
										type={other.type}
										hierarchy={other}
										onClick={() => setOpen(false)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					) : null}
				</CommandList>
			</CommandDialog>
		</>
	)
}

export default SearchMenu
