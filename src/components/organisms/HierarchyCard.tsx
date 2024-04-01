"use client"

import HierarchyConstants from "@/constants/Hierarchy"
import { cn } from "@/lib/utils"
import Peek from "@/svg/peek"
import { THierarchyType } from "@/types/hierarchy"
import { ISVGIconProps } from "@/types/svg"
import { CheckCircleIcon } from "@heroicons/react/16/solid"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface IHierarchyCard {
	type: THierarchyType
	cohortId?: string
	hierarchy: any
	peekIndex?: number
	showHierarchy?: boolean
}

const HierarchyCard: React.FC<IHierarchyCard> = ({
	type,
	cohortId,
	hierarchy,
	peekIndex = 0,
	showHierarchy = false,
}) => {
	const pathname = usePathname()
	const completed = !false
	const bookMarked = true

	if (!HierarchyConstants.hasOwnProperty(type)) return

	const { icon: Icon } = HierarchyConstants[type]
	const IconComponent = Icon as React.ComponentType<ISVGIconProps>

	let basePath = type === "topic" ? `${cohortId}/topic` : pathname
	basePath = basePath.endsWith("/") ? basePath : `${basePath}/`

	return (
		<>
			<Link
				href={`${basePath}${hierarchy._id}`}
				className={cn("relative w-full", {
					"mt-6": showHierarchy,
				})}
				style={{ zIndex: peekIndex + 10 }}
			>
				{showHierarchy ? (
					<div
						className="absolute inset-x-0 -top-6 flex -space-x-6 overflow-y-auto scrollbar-hide"
						style={{ zIndex: peekIndex + 9 }}
					>
						{Array.from({
							length: 2,
						}).map((_, idx) => (
							<div
								key={idx}
								className="relative h-full"
								style={{
									zIndex: peekIndex + 10 + -1 * (idx + 1),
								}}
							>
								<Peek
									border="stroke-purple-300 dark:stroke-purple-600"
									bg="fill-purple-100 dark:fill-purple-900"
									className="!h-8 !w-32"
									style={{
										zIndex: peekIndex + 10 + -1 * (idx + 1),
									}}
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
				<div
					className="relative flex items-center justify-between gap-4 rounded-md bg-gray-50 p-4 shadow ring-1 ring-inset ring-neutral-200 dark:bg-neutral-900 dark:shadow-neutral-900 dark:ring-neutral-800"
					style={{ zIndex: peekIndex + 20 }}
				>
					<div className="flex items-center gap-4">
						{type === "topic" ? (
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
						<p className="line-clamp-1 text-sm">
							{hierarchy.title}
						</p>
					</div>
					{type === "topic" && bookMarked ? (
						<BookmarkIconSolid className="h-4 w-4 shrink-0 fill-yellow-300 dark:fill-yellow-400" />
					) : null}
				</div>
			</Link>
		</>
	)
}

export default HierarchyCard
