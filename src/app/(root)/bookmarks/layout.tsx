import BookmarkFilters from "@/components/organisms/BookmarkFilters"
import Search from "@/components/organisms/Search"
import { Suspense } from "react"

interface IBookmarksLayout {
	children: React.ReactNode
}

const BookmarksLayout: React.FC<Readonly<IBookmarksLayout>> = async ({
	children,
}) => {
	return (
		<>
			<div className="flex h-full flex-col gap-4 overflow-hidden">
				<div className="flex flex-col gap-2 p-4 pb-0">
					<p className="line-clamp-1 text-2xl font-semibold">
						Bookmarks
					</p>
				</div>
				<div className="flex flex-col gap-4 px-4">
					<Suspense fallback="Loading...">
						<BookmarkFilters />
					</Suspense>
					<Suspense fallback="Loading...">
						<Search />
					</Suspense>
				</div>
				{children}
			</div>
		</>
	)
}

export default BookmarksLayout
