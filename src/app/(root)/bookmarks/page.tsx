// import HierarchyCard from "@/components/organisms/HierarchyCard"
// import LinkPreview from "@/components/organisms/LinkPreview"
import PracticeQuestion from "@/components/organisms/PracticeQuestion"
import { Accordion } from "@/components/ui/accordion"
import { sleep } from "@/lib"
import { cache } from "react"

type TBookmarkFilters = "topics" | "resources" | "questions"

interface IBookmarks {
	params: {
		slug: string
	}
	searchParams: {
		filter: TBookmarkFilters
	}
}

const getBookmarks = cache(
	async ({ filter }: { filter: TBookmarkFilters | "all" }) => {
		await sleep(1000)
		return [
			// {
			// 	type: "topics",
			// 	component: () => (
			// 		<HierarchyCard
			// 			type="topic"
			// 			showHierarchy={3}
			// 		/>
			// 	),
			// },
			{
				type: "questions",
				component: () => (
					<Accordion
						type="single"
						collapsible
					>
						<PracticeQuestion idx={1} />
					</Accordion>
				),
			},
			// {
			// 	type: "resources",
			// 	component: () => <LinkPreview />,
			// },
		].filter(d => (filter === "all" ? true : d.type === filter))
	}
)

const Bookmarks: React.FC<IBookmarks> = async ({ searchParams }) => {
	const filter = searchParams?.filter || "all"
	const bookmarks = await getBookmarks({ filter })

	return (
		<div className="flex h-full flex-col gap-5 overflow-y-auto scrollbar">
			{[...bookmarks, ...bookmarks].map(bookmark => (
				<bookmark.component key={bookmark.type} />
			))}
		</div>
	)
}

export default Bookmarks
