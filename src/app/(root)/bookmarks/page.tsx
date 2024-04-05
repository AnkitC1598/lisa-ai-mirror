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
		query: string
	}
}

const Bookmarks: React.FC<IBookmarks> = async ({ searchParams }) => {
	const filter = searchParams?.filter || "all"
	const query = searchParams?.query || ""
	const page = searchParams?.page || 1
	const bookmarks = await getBookmarks({
		page,
		filter: filter.replace(/s\b/g, ""),
	})

	return (
		<div className="flex h-full flex-col gap-5 overflow-y-auto px-4 pb-4 scrollbar">
			{bookmarks
				.filter(bookmark => {
					if (bookmark.body) {
						if ((bookmark.body as Resource).title)
							return (bookmark.body as Resource).title
								.toLowerCase()
								.includes(query.toLowerCase())
						if ((bookmark.body as IPracticeQuestion).question)
							return (bookmark.body as IPracticeQuestion).question
								.toLowerCase()
								.includes(query.toLowerCase())
					}
					if (bookmark.topic)
						return bookmark.topic.title
							.toLowerCase()
							.includes(query.toLowerCase())
					return true
				})
				.map((bookmark, idx) =>
					bookmark.type === "resource" ? (
						<LinkPreview
							key={bookmark._id}
							resource={
								{
									...bookmark.body,
									cohort: bookmark.cohort,
									term: bookmark.term,
									subject: bookmark.subject,
									chapter: bookmark.chapter,
									topic: bookmark.topic,
								} as Resource & { [key: string]: any }
							}
							params={{
								courseId: bookmark.cohortId,
								topicId: bookmark.topicId,
							}}
							showHierarchy
						/>
					) : bookmark.type === "question" ? (
						<Accordion
							type="single"
							collapsible
						>
							<PracticeQuestion
								key={bookmark._id}
								idx={idx}
								question={
									{
										...bookmark.body,
										cohort: bookmark.cohort,
										term: bookmark.term,
										subject: bookmark.subject,
										chapter: bookmark.chapter,
										topic: bookmark.topic,
									} as IPracticeQuestion & {
										[key: string]: any
									}
								}
								showHierarchy
							/>
						</Accordion>
					) : (
						<HierarchyCard
							key={bookmark._id}
							type="topic"
							showHierarchy
							cohortId={bookmark.cohortId}
							hierarchy={{
								...bookmark.topic,
								cohort: bookmark.cohort,
								term: bookmark.term,
								subject: bookmark.subject,
								chapter: bookmark.chapter,
								topic: bookmark.topic,
							}}
						/>
					)
				)}
		</div>
	)
}

export default Bookmarks
