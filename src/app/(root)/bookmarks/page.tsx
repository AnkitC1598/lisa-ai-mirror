"use client"

import { getBookmarks } from "@/actions/bookmarks"
import Loading from "@/components/atoms/Loading"
import BookmarkFilters from "@/components/organisms/BookmarkFilters"
import HierarchyCard from "@/components/organisms/HierarchyCard"
import LinkPreview from "@/components/organisms/LinkPreview"
import { PracticeQuestion } from "@/components/organisms/PracticeQuestions"
import Search from "@/components/organisms/Search"
import { Accordion } from "@/components/ui/accordion"
import usePaginatedAction from "@/hooks/usePaginatedAction"
import PageTransitionProvider from "@/providers/pageTransitionProvider"
import { IBookmark } from "@/types/bookmark"
import { IPracticeQuestion, Resource } from "@/types/topic"
import { useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"

type TBookmarkFilters = "topics" | "resources" | "questions"

interface IBookmarks {
	params: {
		slug: string
	}
	searchParams: {
		filter: TBookmarkFilters
		query: string
	}
}

const Bookmarks: React.FC<IBookmarks> = ({ searchParams }) => {
	const filter = searchParams?.filter || "all"
	const query = searchParams?.query || ""
	const { ref, inView } = useInView()
	const [localLoading, setLocalLoading] = useState<boolean>(false)

	const {
		data: bookmarks,
		loading,
		fetchMore,
		hasNextPage,
		refetch,
	} = usePaginatedAction({
		action: getBookmarks,
		meta: { filter: filter.replace(/s\b/g, "") },
		limit: 15,
	})

	const filteredBookmarks = useMemo(() => {
		if (!bookmarks) return []
		setLocalLoading(true)
		let arr = bookmarks.filter((bookmark: IBookmark) => {
			if (!query.length) return true
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
		setLocalLoading(false)
		return arr
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bookmarks, query, filter])

	useEffect(() => {
		if (inView && hasNextPage && !loading) fetchMore()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView])

	useEffect(() => {
		if (!loading && !!bookmarks)
			refetch({ meta: { filter: filter.replace(/s\b/g, "") } })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter])

	return (
		<>
			<PageTransitionProvider>
				<div className="flex h-full flex-col gap-4 overflow-hidden">
					<div className="flex items-center justify-start gap-2 p-4 pb-0">
						<p className="text-base font-medium">Bookmarks</p>
						{bookmarks.length ? (
							<span className="inline-flex h-5 select-none items-center gap-1 whitespace-nowrap  rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium capitalize text-yellow-800 ring-1 ring-inset ring-yellow-600/20  dark:bg-yellow-400/10 dark:text-yellow-400 dark:ring-yellow-400/30 ">
								{`${String(bookmarks.length).padStart(2, "0")}`}
							</span>
						) : null}
					</div>
					<div className="flex flex-col gap-4 px-4">
						<BookmarkFilters />
						<Search />
					</div>
					<div className="mt-2 flex h-full flex-col gap-5 overflow-y-auto px-4 pb-4 scrollbar">
						{localLoading ? (
							<Loading />
						) : filteredBookmarks.length ? (
							filteredBookmarks.map(
								(bookmark: IBookmark, idx: number) =>
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
												} as Resource & {
													[key: string]: any
												}
											}
											params={{
												courseId: bookmark.cohortId,
												topicId: bookmark.topicId,
											}}
											showHierarchy
											comingFrom="bookmarks"
										/>
									) : bookmark.type === "question" ? (
										<Accordion
											key={bookmark._id}
											type="single"
											collapsible
										>
											<PracticeQuestion
												idx={idx}
												question={
													{
														...bookmark.body,
														cohort: bookmark.cohort,
														term: bookmark.term,
														subject:
															bookmark.subject,
														chapter:
															bookmark.chapter,
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
							)
						) : (
							<div className="flex w-full items-center justify-center py-8">
								<p className="text-base font-medium text-gray-500 dark:text-gray-400">
									No bookmarks found
								</p>
							</div>
						)}
						{query ? null : (
							<span
								className="flex w-full items-center justify-center"
								ref={ref}
							>
								{loading ? <Loading /> : null}
							</span>
						)}
					</div>
				</div>
			</PageTransitionProvider>
		</>
	)
}

export default Bookmarks
