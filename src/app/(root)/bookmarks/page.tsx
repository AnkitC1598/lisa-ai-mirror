// import LinkPreview from "@/components/organisms/LinkPreview"
import { getBookmarks } from "@/actions/bookmarks"
import HierarchyCard from "@/components/organisms/HierarchyCard"

type TBookmarkFilters = "topics" | "resources" | "questions"

interface IBookmarks {
	params: {
		slug: string
	}
	searchParams: {
		filter: TBookmarkFilters
		page: number
	}
}

const Bookmarks: React.FC<IBookmarks> = async ({ searchParams }) => {
	const filter = searchParams?.filter || "all"
	const page = searchParams?.page || 1
	const bookmarks = await getBookmarks({ page })

	return (
		<div className="flex h-full flex-col gap-5 overflow-y-auto scrollbar">
			{/* {[...bookmarks, ...bookmarks].map(bookmark => (
				<bookmark.component key={bookmark.type} />
			))} */}
			{bookmarks.map(bookmark => (
				<HierarchyCard
					key={bookmark._id}
					type="topic"
					showHierarchy
					hierarchy={bookmark.topic}
				/>
			))}
		</div>
	)
}

export default Bookmarks
