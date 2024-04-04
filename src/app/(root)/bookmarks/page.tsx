import { getBookmarks } from "@/actions/bookmarks"
import HierarchyCard from "@/components/organisms/HierarchyCard"
import LinkPreview from "@/components/organisms/LinkPreview"
import { PracticeQuestion } from "@/components/organisms/PracticeQuestions"
import { Accordion } from "@/components/ui/accordion"
import { IPracticeQuestion, Resource } from "@/types/topic"

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
	const bookmarks = await getBookmarks({ page, filter })

	return (
		<div className="flex h-full flex-col gap-5 overflow-y-auto scrollbar">
			{bookmarks.map((bookmark, idx) =>
				bookmark.type === "resource" ? (
					<LinkPreview
						key={bookmark._id}
						resource={bookmark.body as Resource}
						params={{
							courseId: bookmark.cohortId,
							topicId: bookmark.topicId,
						}}
					/>
				) : bookmark.type === "question" ? (
					<Accordion
						type="single"
						collapsible
					>
						<PracticeQuestion
							key={bookmark._id}
							idx={idx}
							hideIndex
							question={bookmark.body as IPracticeQuestion}
						/>
					</Accordion>
				) : (
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
