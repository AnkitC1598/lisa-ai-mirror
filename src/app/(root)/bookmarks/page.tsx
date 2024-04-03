import { getBookmarks } from "@/actions/bookmarks"
import HierarchyCard from "@/components/organisms/HierarchyCard"
import LinkPreview from "@/components/organisms/LinkPreview"
import { Resource } from "@/types/topic"

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
	// const filter = searchParams?.filter || "all"
	const page = searchParams?.page || 1
	const bookmarks = await getBookmarks({ page })

	return (
		<div className="flex h-full flex-col gap-5 overflow-y-auto scrollbar">
			{bookmarks.map(bookmark =>
				bookmark.type === "resource" ? (
					<LinkPreview
						key={bookmark._id}
						resource={bookmark.body as Resource}
					/>
				) : (
					// bookmark.type === "question" ? (
					// <PracticeQuestion
					// 	key={bookmark._id}
					// 	question={bookmark.body as IPracticeQuestion}
					// />
					// ) :
					<HierarchyCard
						key={bookmark._id}
						type="topic"
						showHierarchy
						hierarchy={
							bookmark.topic as {
								_id: string
								title: string
								details: any
								priority: number
							}
						}
					/>
				)
			)}
		</div>
	)
}

export default Bookmarks
