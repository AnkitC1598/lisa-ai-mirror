"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Input } from "../ui/input"

interface ISearchProps {
	placeholder?: string
}

const Search: React.FC<ISearchProps> = ({ placeholder = "Search" }) => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback((query: string) => {
		const params = new URLSearchParams(searchParams)
		if (query) params.set("query", query)
		else params.delete("query")

		replace(`${pathname}?${params.toString()}`)
	}, 500)

	return (
		<>
			<div className="relative">
				<div className="absolute inset-y-0 left-2 flex items-center">
					<MagnifyingGlassIcon className="h-4 w-4 shrink-0 opacity-50" />
				</div>
				<Input
					placeholder={placeholder}
					type="search"
					onChange={e => {
						handleSearch(e.target.value)
					}}
					defaultValue={searchParams.get("query")?.toString()}
					className="pl-8 dark:bg-neutral-900"
				/>
			</div>
		</>
	)
}

export default Search
