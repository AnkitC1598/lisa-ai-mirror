import { getBookmarks } from "@/actions/bookmarks"
import BookmarkFilters from "@/components/organisms/BookmarkFilters"
import HierarchyCard from "@/components/organisms/HierarchyCard"
import LinkPreview from "@/components/organisms/LinkPreview"
import { PracticeQuestion } from "@/components/organisms/PracticeQuestions"
import Search from "@/components/organisms/Search"
import { Accordion } from "@/components/ui/accordion"
import { IPracticeQuestion, Resource } from "@/types/topic"
import { Suspense } from "react"

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
		<div className="flex h-full flex-col gap-4 overflow-hidden">
			<div className="flex flex-col gap-2 p-4 pb-0">
				<p className="line-clamp-1 text-2xl font-semibold">
					Bookmarks{" "}
					<span className="inline-flex h-5 select-none items-center gap-1 whitespace-nowrap rounded-md bg-purple-50 px-1.5 py-0.5 text-xs font-medium capitalize text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
						{`${String(bookmarks.length).padStart(2, "0")}`}
					</span>
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
			<div className="flex h-full flex-col gap-5 overflow-y-auto px-4 pb-4 scrollbar">
				{bookmarks
					.filter(bookmark => {
						if (bookmark.body) {
							if ((bookmark.body as Resource).title)
								return (bookmark.body as Resource).title
									.toLowerCase()
									.includes(query.toLowerCase())
							if ((bookmark.body as IPracticeQuestion).question)
								return (
									bookmark.body as IPracticeQuestion
								).question
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
		</div>
	)
}

export default Bookmarks
