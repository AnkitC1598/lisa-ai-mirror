"use client"

import { getHierarchyData } from "@/actions/hierarchy"
import icon from "@/app/favicon.ico"
import Loading from "@/components/atoms/Loading"
import HierarchyCard from "@/components/organisms/HierarchyCard"
import Search from "@/components/organisms/Search"
import HierarchyConstants from "@/constants/Hierarchy"
import useGetHierarchy from "@/hooks/useGetHierarchy"
import { cn } from "@/lib/utils"
import { NonNullable } from "@/types"
import { IHierarchy, ILevel, THierarchyType } from "@/types/hierarchy"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

interface IHierarchySlugs {
	params: {
		slug: string[]
	}
	searchParams: {
		query: string
	}
}

const HierarchySlugs: React.FC<IHierarchySlugs> = ({
	params: { slug },
	searchParams,
}) => {
	const query = searchParams?.query || ""
	const [hierarchyData, setHierarchyData] = useState<IHierarchy | null>(null)

	const { prevLevel, currentLevel, currentView } = useGetHierarchy() as {
		prevLevel: NonNullable<ILevel>
		currentLevel: NonNullable<ILevel>
		currentView: THierarchyType
	}
	const lastTitle = useMemo(() => {
		if (!hierarchyData) return null

		if (currentLevel.idType !== prevLevel.idType)
			return hierarchyData[prevLevel.idType].title

		return null
	}, [currentLevel.idType, hierarchyData, prevLevel.idType])

	const filteredHierarchyChildren = useMemo(() => {
		if (
			!hierarchyData ||
			!hierarchyData.children ||
			!hierarchyData.children.length
		)
			return []

		return hierarchyData.children.filter(child =>
			child.title.toLowerCase().includes(query.toLowerCase())
		)
	}, [hierarchyData, query])

	useEffect(() => {
		if (!currentLevel.id || !currentLevel.idType) return

		getHierarchyData({
			hierarchy: currentView,
			cohortId: slug[0],
			...currentLevel,
		}).then(resp => setHierarchyData(resp))
	}, [slug, currentView, currentLevel])

	const { colors } = HierarchyConstants[currentView]

	if (!hierarchyData)
		return (
			<div className="flex h-full w-full items-center justify-center py-8">
				<Loading icon />
			</div>
		)

	return (
		<>
			<div className="flex h-full flex-col gap-4 overflow-hidden pt-4">
				<div className="flex flex-col gap-4 px-4">
					<div className="flex gap-4">
						{currentLevel.idType !== "cohort" ? null : (
							<div className="relative h-14 w-14 shrink-0 rounded-md p-2 ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800">
								<div className="relative h-10 w-10 overflow-hidden rounded-md">
									<Image
										src={hierarchyData.icon ?? icon}
										alt={hierarchyData.title}
										fill
									/>
								</div>
							</div>
						)}
						<div className="flex flex-col justify-center gap-1">
							{currentLevel.idType !== "cohort" ? (
								<p className="line-clamp-1 text-sm text-gray-500">
									{lastTitle}
								</p>
							) : null}
							<p className="flex items-center gap-2 text-base font-medium">
								{hierarchyData.title}
							</p>
						</div>
					</div>
					<Search placeholder={`Search ${currentView}s`} />
					{currentView === "topic" ? (
						<div className="mt-2 flex items-center justify-between text-sm">
							<span>All Topics</span>
							<span className="text-gray-500">
								{hierarchyData.completedAiTopics} /{" "}
								{hierarchyData.children.length} completed
							</span>
						</div>
					) : (
						<div className="mt-2 flex items-center justify-start gap-2 text-sm">
							<span>{`All ${currentView}s`}</span>{" "}
							<span
								className={cn(
									"inline-flex h-5 select-none items-center gap-1 whitespace-nowrap  rounded-md px-1.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset",
									colors.badge
								)}
							>
								{`${String(hierarchyData.children.length).padStart(2, "0")}`}
							</span>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-4 overflow-auto px-4 pb-4 scrollbar">
					{filteredHierarchyChildren.length
						? filteredHierarchyChildren.map((hierarchy: any) => (
								<HierarchyCard
									type={currentView}
									cohortId={slug[0]}
									hierarchy={hierarchy}
									key={hierarchy._id}
								/>
							))
						: null}
				</div>
			</div>
		</>
	)
}

export default HierarchySlugs
