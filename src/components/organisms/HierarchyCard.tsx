"use client"

import HierarchyConstants from "@/constants/Hierarchy"
import useGetHierarchy from "@/hooks/useGetHierarchy"
import { THierarchyType } from "@/types/hierarchy"
import { ISVGIconProps } from "@/types/svg"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname } from "next/navigation"

const routes: Record<string, string> = {
	term: "659bb67c09fbd38e9a81e0cc",
	subject: "659bb7cd09fbd38e9a81e0ce",
	chapter: "659bb80c09fbd38e9a81e0d1",
	topic: "topicView",
}

interface IHierarchyCard {
	type?: THierarchyType
}

const HierarchyCard: React.FC<IHierarchyCard> = ({ type = "default" }) => {
	const pathname = usePathname()

	const bookMarked = true

	const { currentView } = useGetHierarchy() as { currentView: THierarchyType }

	const { icon: Icon } = HierarchyConstants[currentView]
	const IconComponent = Icon as React.ComponentType<ISVGIconProps>

	// const handleBookmark = (
	// 	e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	// ) => {
	// 	e.stopPropagation()
	// 	e.preventDefault()
	// 	setBookMarked(prev => !prev)
	// }

	return (
		<>
			<Link
				href={`${currentView === "topic" ? "/topic" : pathname}/${routes[currentView]}`}
				className="flex items-center justify-between gap-4 rounded-md p-4 shadow ring-1 ring-inset ring-neutral-200 dark:shadow-neutral-800 dark:ring-neutral-800"
			>
				<div className="flex items-center gap-4">
					{IconComponent ? (
						<IconComponent className="h-4 w-4 shrink-0" />
					) : null}
					<p className="line-clamp-1 text-sm">{currentView}</p>
				</div>
				{currentView === "topic" && bookMarked ? (
					<BookmarkIconSolid className="h-4 w-4 shrink-0" />
				) : null}
			</Link>
		</>
	)
}

export default HierarchyCard
