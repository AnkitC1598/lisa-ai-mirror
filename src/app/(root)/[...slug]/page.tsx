"use client"

import { getHierarchyData } from "@/actions/hierarchy"
import icon from "@/app/favicon.ico"
import HierarchyCard from "@/components/organisms/HierarchyCard"
import Search from "@/components/organisms/Search"
import useGetHierarchy from "@/hooks/useGetHierarchy"
import { NonNullable } from "@/types"
import { ILevel, THierarchyType } from "@/types/hierarchy"
import Image from "next/image"
import { useEffect, useState } from "react"

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
	const [hierarchyData, setHierarchyData] = useState([])

	const { currentLevel, currentView } = useGetHierarchy() as {
		currentLevel: NonNullable<ILevel>
		currentView: THierarchyType
	}

	useEffect(() => {
		getHierarchyData({
			query,
			hierarchy: currentView,
			cohortId: slug[0],
			...currentLevel,
		}).then(resp => setHierarchyData(resp.children))
	}, [slug, currentView, currentLevel, query])

	return (
		<>
			<div className="flex h-full flex-col gap-4 overflow-hidden pt-4">
				<div className="flex flex-col gap-4 px-4">
					<div className="flex gap-4">
						<div className="relative h-14 w-14 shrink-0 rounded-md ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800">
							<Image
								src={icon}
								alt="icon"
								fill
							/>
						</div>
						<p className="line-clamp-2 text-lg font-medium">
							Title
						</p>
					</div>
					<Search />
				</div>
				<div className="flex flex-col gap-4 overflow-auto px-4 pb-4 scrollbar">
					{hierarchyData && hierarchyData.length
						? hierarchyData.map((hierarchy: any) => (
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
