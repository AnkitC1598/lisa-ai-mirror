import BookmarkFilters from "@/components/organisms/BookmarkFilters"
import Search from "@/components/organisms/Search"
import { Skeleton } from "@/components/ui/skeleton"

const Loader = () => {
	return (
		<>
			<div className="flex h-full flex-col gap-4 overflow-hidden">
				<div className="flex items-center justify-start gap-2 p-4 pb-0">
					<p className="text-base font-medium">Bookmarks</p>
				</div>
				<div className="flex flex-col gap-4 px-4">
					<BookmarkFilters />
					<Search />
				</div>
				<div className="mt-2 flex h-full flex-col gap-5 overflow-y-auto px-4 pb-4 scrollbar">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-40 w-full" />
				</div>
			</div>
		</>
	)
}

export default Loader
