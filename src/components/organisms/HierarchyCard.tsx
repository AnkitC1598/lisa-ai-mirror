"use client"

import HierarchyConstants from "@/constants/Hierarchy"
import HierarchyTypes from "@/constants/HierarchyTypes"
import { cn } from "@/lib/utils"
import { THierarchyType } from "@/types/hierarchy"
import { ISVGIconProps } from "@/types/svg"
import { CheckCircleIcon } from "@heroicons/react/16/solid"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import HierarchyPeek from "./HierarchyPeek"

interface IHierarchyCard {
	type: THierarchyType
	cohortId?: string
	hierarchy: any
	peekIndex?: number
	showHierarchy?: boolean
	makeRoute?: boolean
	[key: string]: any
}

const HierarchyCard: React.FC<IHierarchyCard> = ({
	type,
	cohortId = "",
	hierarchy,
	peekIndex = 0,
	showHierarchy = false,
	makeRoute = false,
	...props
}) => {
	const pathname = usePathname()

	const { icon: Icon, colors } = HierarchyConstants[type] ?? {
		icon: null,
		colors: {},
	}
	const IconComponent = Icon as React.ComponentType<ISVGIconProps>

	const href = useMemo(() => {
		if (!hierarchy) return "/"
		if (!makeRoute) {
			let link = type === "topic" ? `/${cohortId}/topic` : pathname
			return link.endsWith("/") ? link : `${link}/` + hierarchy._id
		}

		if (hierarchy.type === "cohort") return `/${hierarchy._id}`
		else {
			const currentHierarchy = hierarchy.cohort.type
				.map((t: string) => t[0])
				.join("")

			if (!currentHierarchy) return "/"
			let hierarchyArr = HierarchyTypes[currentHierarchy]
			hierarchyArr = hierarchyArr.slice(
				0,
				hierarchyArr.indexOf(hierarchy.type) + 1
			)
			let route = [""]

			hierarchyArr.forEach((h, i) => {
				const hierarchyKey = h === "course" ? "cohort" : h
				if (i === 0) route.push(hierarchy.cohort._id)
				else if (i === hierarchyArr.length - 1)
					route.push(hierarchy._id)
				else route.push(hierarchy[hierarchyKey]._id)
			})

			return route.join("/")
		}
	}, [hierarchy, makeRoute, type, cohortId, pathname])

	const peekValue = useMemo(() => {
		if (!showHierarchy || !hierarchy.cohort)
			return {
				icon: "",
				breadcrumbs: [],
			}

		const currentHierarchy = hierarchy.cohort.type
			.map((t: string) => t[0])
			.join("")

		if (!currentHierarchy)
			return {
				icon: "",
				breadcrumbs: [],
			}
		let hierarchyArr: THierarchyType[] = HierarchyTypes[currentHierarchy]
		hierarchyArr = hierarchyArr
			.slice(0, hierarchyArr.indexOf(hierarchy.type))
			.slice(-2)

		let route: {
			icon: string | null
			breadcrumbs: {
				color: { border: string; bg: string }
				title: string
				_id: string
			}[]
		} = { icon: hierarchy.cohort.icon, breadcrumbs: [] }

		hierarchyArr.forEach((h, i) => {
			const hierarchyKey = h === "course" ? "cohort" : h
			const {
				colors: { peek: color },
			} = HierarchyConstants[hierarchyKey]
			route.breadcrumbs.push({
				color,
				title: hierarchy[hierarchyKey].title,
				_id: hierarchy.cohort._id,
			})
		})

		return route
	}, [hierarchy, showHierarchy])

	return (
		<>
			<Link
				href={href}
				className={cn("relative w-full", {
					"mt-6": showHierarchy,
				})}
				style={{ zIndex: peekIndex + 10 }}
				{...props}
			>
				{showHierarchy ? (
					<HierarchyPeek
						peekIndex={peekIndex}
						peekValue={peekValue}
					/>
				) : null}
				<div
					className={
						"relative flex items-center justify-between gap-4 rounded-md bg-neutral-50 p-4 shadow ring-1 ring-inset ring-neutral-200 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-500/20"
					}
					style={{ zIndex: peekIndex + 20 }}
				>
					<div className="flex items-center gap-4">
						{type === "topic" ? (
							<CheckCircleIcon
								className={cn(
									"h-4 w-4 shrink-0",
									hierarchy.completed
										? "fill-green-500"
										: "fill-neutral-300 dark:fill-neutral-700"
								)}
							/>
						) : IconComponent ? (
							<IconComponent
								className={cn(
									"h-4 w-4 shrink-0",
									colors.card.icon
								)}
							/>
						) : null}
						<p className="line-clamp-1 text-sm">
							{hierarchy.title}
						</p>
					</div>
					{type === "topic" && hierarchy.bookmarked ? (
						<BookmarkIconSolid className="h-4 w-4 shrink-0 fill-yellow-500 dark:fill-yellow-400" />
					) : null}
				</div>
			</Link>
		</>
	)
}

export default HierarchyCard
