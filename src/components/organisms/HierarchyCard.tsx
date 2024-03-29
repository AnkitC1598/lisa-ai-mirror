"use client"

import HierarchyConstants from "@/constants/Hierarchy"
import useGetHierarchy from "@/hooks/useGetHierarchy"
import { cn } from "@/lib/utils"
import Peek from "@/svg/peek"
import { THierarchyType } from "@/types/hierarchy"
import { ISVGIconProps } from "@/types/svg"
import { CheckCircleIcon } from "@heroicons/react/16/solid"
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
	showHierarchy?: boolean | number
}

const HierarchyCard: React.FC<IHierarchyCard> = ({
	type = null,
	showHierarchy = false,
}) => {
	const pathname = usePathname()
	const completed = !false
	const bookMarked = true

	const { currentView } = useGetHierarchy() as { currentView: THierarchyType }

	const typeToUse = type !== null ? type : currentView

	if (!HierarchyConstants.hasOwnProperty(typeToUse)) return

	const { icon: Icon } = HierarchyConstants[typeToUse]
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
				href={`${typeToUse === "topic" ? "/topic" : pathname}/${routes[typeToUse]}`}
				className={cn(
					"relative flex w-full items-center justify-between gap-4 rounded-md bg-gray-50 p-4 shadow ring-1 ring-inset ring-neutral-200 dark:bg-neutral-900 dark:shadow-neutral-900 dark:ring-neutral-800",
					{ "mt-6": showHierarchy }
				)}
			>
				{showHierarchy ? (
					<div className="absolute inset-x-0 -top-6 flex -space-x-6 overflow-y-auto scrollbar-hide">
						{Array.from({
							length: showHierarchy === true ? 4 : showHierarchy,
						}).map((_, idx) => (
							<div
								key={idx}
								className="relative h-full"
								style={{ zIndex: -1 * (idx + 1) }}
							>
								<Peek
									border="stroke-purple-300 dark:stroke-purple-600"
									bg="fill-purple-100 dark:fill-purple-900"
									style={{ zIndex: -1 * (idx + 1) }}
								/>
								<span className="absolute inset-x-0 bottom-3 flex items-center justify-start pl-4 pr-8 text-xs">
									<span className="truncate">
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit
									</span>
								</span>
							</div>
						))}
					</div>
				) : null}
				<div className="z-0 flex items-center gap-4">
					{typeToUse === "topic" ? (
						<CheckCircleIcon
							className={cn(
								"h-4 w-4 shrink-0",
								completed
									? "fill-green-500 dark:fill-green-600"
									: "fill-neutral-300 dark:fill-neutral-700"
							)}
						/>
					) : IconComponent ? (
						<IconComponent className="h-4 w-4 shrink-0" />
					) : null}
					<p className="line-clamp-1 text-sm">{typeToUse}</p>
				</div>
				{typeToUse === "topic" && bookMarked ? (
					<BookmarkIconSolid className="h-4 w-4 shrink-0 fill-yellow-300 dark:fill-yellow-400" />
				) : null}
			</Link>
		</>
	)
}

export default HierarchyCard
