"use client"

import { getDriveFiles, getHierarchyData } from "@/actions/hierarchy"
import icon from "@/app/favicon.ico"
import Placeholder from "@/components/atoms/Placeholder"
import DriveFile from "@/components/organisms/DriveFile"
import HierarchyCard from "@/components/organisms/HierarchyCard"
import Search from "@/components/organisms/Search"
import { Skeleton } from "@/components/ui/skeleton"
import HierarchyConstants from "@/constants/Hierarchy"
import useGetHierarchy from "@/hooks/useGetHierarchy"
import { cn } from "@/lib/utils"
import PageTransitionProvider from "@/providers/pageTransitionProvider"
import { NonNullable } from "@/types"
import {
	IDriveFile,
	IHierarchy,
	ILevel,
	THierarchyType,
} from "@/types/hierarchy"
import { FolderIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import Link from "next/link"
import { usePostHog } from "posthog-js/react"
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
	const [driveFiles, setDriveFiles] = useState<IDriveFile[] | [] | null>(null)

	const posthog = usePostHog()

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

	const filteredDriveFiles = useMemo(() => {
		if (!driveFiles || !driveFiles.length) return []

		return driveFiles.filter(file =>
			file.title.toLowerCase().includes(query.toLowerCase())
		)
	}, [driveFiles, query])

	useEffect(() => {
		if (!currentLevel.id || !currentLevel.idType) return

		if (searchParams.query) {
			posthog.capture("hierarchy_search", {
				type: currentView,
				query: searchParams.query || null,
			})
		}

		getHierarchyData({
			hierarchy: currentView,
			cohortId: slug[0],
			...currentLevel,
		}).then(resp => {
			setHierarchyData(resp)

			posthog.capture("hierarchy_opened", {
				type:
					currentLevel.idType === "cohort"
						? "course"
						: currentLevel.idType,
				id: resp._id,
				title: resp.title,
				query: searchParams.query || null,
			})
		})
		getDriveFiles({ cohortId: slug[0], ...currentLevel }).then(resp =>
			setDriveFiles(resp)
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slug, currentView, currentLevel])

	const { colors, icon: Icon } = HierarchyConstants[currentView]

	if (!hierarchyData || !driveFiles)
		return (
			<PageTransitionProvider>
				<div className="flex h-full flex-col gap-4 overflow-hidden pt-4">
					<div className="flex flex-col gap-4 px-4">
						<div className="flex flex-col justify-center gap-4">
							<Skeleton className="h-4 w-1/3" />
							<Skeleton className="h-4 w-1/2" />
						</div>
						<Skeleton className="h-9 w-full" />
					</div>
					<div className="flex flex-col gap-4 overflow-auto px-4 pb-4 scrollbar">
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-12 w-full" />
						<Skeleton className="h-12 w-full" />
						<Skeleton className="h-12 w-full" />
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-12 w-full" />
						<Skeleton className="h-12 w-full" />
						<Skeleton className="h-12 w-full" />
					</div>
				</div>
			</PageTransitionProvider>
		)

	return (
		<>
			<PageTransitionProvider>
				<div className="flex h-full flex-col gap-4 overflow-hidden pt-4">
					<div className="flex flex-col gap-4 px-4">
						<div className="flex gap-4">
							{currentLevel.idType !== "cohort" ? null : (
								<div className="relative h-14 w-14 shrink-0 rounded-md bg-neutral-50 p-2 ring-1 ring-inset ring-neutral-200 dark:bg-neutral-950 dark:ring-neutral-800">
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
									<Link
										href={`/${slug.slice(0, -1).join("/")}`}
										className="line-clamp-1 text-sm text-gray-500"
									>
										{lastTitle}
									</Link>
								) : null}
								<p className="flex items-center gap-2 text-base font-medium">
									{hierarchyData.title}
								</p>
							</div>
						</div>
						<Search placeholder={`Search ${currentView}s`} />
					</div>
					<div className="flex flex-col gap-4 overflow-auto px-4 pb-4 scrollbar">
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
										"inline-flex h-5 select-none items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset",
										colors.badge
									)}
								>
									{`${String(hierarchyData.children.length).padStart(2, "0")}`}
								</span>
							</div>
						)}
						{filteredHierarchyChildren.length ? (
							filteredHierarchyChildren.map((hierarchy: any) => (
								<HierarchyCard
									type={currentView}
									cohortId={slug[0]}
									hierarchy={hierarchy}
									key={hierarchy._id}
								/>
							))
						) : (
							<div className="flex h-full w-full items-center justify-center py-8">
								{/* No {currentView} found */}
								<Placeholder
									icon={Icon}
									text={`No ${currentView}s`}
								/>
							</div>
						)}
						<div className="mt-4 flex items-center justify-start gap-2 text-sm">
							<span>All Files</span>
							<span
								className={cn(
									"inline-flex h-5 select-none items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset",
									colors.badge
								)}
							>
								{`${String(driveFiles.length).padStart(2, "0")}`}
							</span>
						</div>
						{filteredDriveFiles.length ? (
							filteredDriveFiles.map(file => (
								<DriveFile
									key={file._id}
									file={file}
									hierarchy={hierarchyData}
									hierarchyType={currentView}
								/>
							))
						) : (
							<div className="flex h-full w-full items-center justify-center py-8">
								<Placeholder
									icon={FolderIcon}
									text="No files uploaded"
								/>
							</div>
						)}
					</div>
				</div>
			</PageTransitionProvider>
		</>
	)
}

export default HierarchySlugs
