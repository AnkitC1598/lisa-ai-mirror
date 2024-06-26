"use client"

import {
	addResourceBookmark,
	removeResourceBookmark,
} from "@/actions/bookmarks"
import HierarchyConstants from "@/constants/Hierarchy"
import HierarchyTypes from "@/constants/HierarchyTypes"
import { cn } from "@/lib"
import useAIStore from "@/store"
import { Resource } from "@/types/topic"
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useParams } from "next/navigation"
import { usePostHog } from "posthog-js/react"
import { useMemo, useState } from "react"
import { Button } from "../ui/button"
import HierarchyPeek from "./HierarchyPeek"

interface ILinkPreview {
	resource: Resource & {
		[key: string]: any
	}
	params?: { courseId: string; topicId: string }
	bookmarkState?: boolean
	peekIndex?: number
	showHierarchy?: boolean
	comingFrom?: string
}

const LinkPreview: React.FC<ILinkPreview> = ({
	resource,
	params,
	bookmarkState = false,
	peekIndex = 0,
	showHierarchy = false,
	comingFrom = "topic",
}) => {
	const [bookmarked, setBookmarked] = useState<boolean>(
		resource.bookmarked ?? bookmarkState
	)
	const currentTopic = useAIStore(store => store.currentTopic)
	const { courseId: cohortId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	const posthog = usePostHog()

	const handleLink =
		(type: "web" | "video" = "web") =>
		() => {
			posthog.capture("resource_visited", {
				hierarchy: {
					type: "topic",
					id: currentTopic?._id,
					title: currentTopic?.title,
					priority: currentTopic?.priority ?? null,
				},
				id: resource.id,
				resourceUrl: resource.url,
				type,
			})
		}

	const handleBookmark = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()
		e.preventDefault()
		setBookmarked(prev => !prev)

		if (bookmarked) {
			removeResourceBookmark({
				cohortId: cohortId ?? params?.courseId,
				topicId: topicId ?? params?.topicId,
				resourceId: resource.id,
			}).then(code => {
				if (code === 200) {
					setBookmarked(false)
					posthog.capture("bookmark_toggle", {
						hierarchy: {
							type: "topic",
							id:
								currentTopic?._id ??
								resource.topic?._id ??
								topicId,
							title: currentTopic?.title ?? resource.topic?.title,
							priority:
								currentTopic?.priority ??
								resource.topic?.priority ??
								null,
						},
						type: "resource",
						id: resource.id,
						action: "removed",
					})
				}
			})
		} else {
			addResourceBookmark({
				cohortId: cohortId ?? params?.courseId,
				topicId: topicId ?? params?.topicId,
				body: resource,
			}).then(code => {
				if (code === 200) {
					setBookmarked(true)
					posthog.capture("bookmark_toggle", {
						hierarchy: {
							type: "topic",
							id:
								currentTopic?._id ??
								resource.topic?._id ??
								topicId,
							title: currentTopic?.title ?? resource.topic?.title,
							priority:
								currentTopic?.priority ??
								resource.topic?.priority ??
								null,
						},
						type: "resource",
						id: resource.id,
						action: "added",
					})
				}
			})
		}
	}

	const peekValue = useMemo(() => {
		if (!showHierarchy || !resource.cohort)
			return {
				icon: "",
				breadcrumbs: [],
			}

		const currentHierarchy = resource.cohort.type
			.map((t: string) => t[0])
			.join("")

		if (!currentHierarchy)
			return {
				icon: "",
				breadcrumbs: [],
			}
		const hierarchyArr = HierarchyTypes[currentHierarchy].slice(-2)
		let route: {
			icon: string | null
			breadcrumbs: {
				color: { border: string; bg: string }
				title: string
				_id: string
			}[]
		} = { icon: resource.cohort.icon, breadcrumbs: [] }

		hierarchyArr.forEach((h, i) => {
			const hierarchyKey = h === "course" ? "cohort" : h
			const {
				colors: { peek: color },
			} = HierarchyConstants[hierarchyKey]
			route.breadcrumbs.push({
				color,
				title: resource[hierarchyKey].title,
				_id: resource[hierarchyKey]._id,
			})
		})

		return route
	}, [resource, showHierarchy])

	return (
		<>
			<a
				href={`${resource.url}?utm_source=lisa_ai_${comingFrom}&utm_medium=${cohortId ?? params?.courseId}&utm_content=resource_link_click`}
				target="_blank"
				rel="noopener noreferrer"
				onClick={handleLink()}
				className={cn("relative w-full cursor-pointer", {
					"mt-6": showHierarchy,
				})}
				style={{ zIndex: peekIndex + 10 }}
			>
				{showHierarchy ? (
					<HierarchyPeek
						peekIndex={peekIndex}
						peekValue={peekValue}
					/>
				) : null}
				<div
					className="group/resource relative flex w-full flex-1 flex-col gap-3 rounded-md  bg-neutral-50 p-4 shadow-md ring-1 ring-inset ring-neutral-200 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-500/20"
					style={{ zIndex: peekIndex + 20 }}
				>
					<div className="flex flex-1 flex-col gap-2">
						<span className="line-clamp-2 pr-7 text-sm font-medium underline-offset-2 group-hover/resource:underline">
							{resource.title}
						</span>
						<span
							className="line-clamp-2 text-xs text-gray-500"
							dangerouslySetInnerHTML={{
								__html: resource.description,
							}}
						/>
					</div>
					<div className="flex w-full items-center justify-between gap-2">
						<div className="flex w-[calc(100%-48px)] items-center gap-3">
							<div className="relative flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-md border bg-neutral-50">
								<div className="relative h-[20px] w-[20px] rounded">
									<Image
										src={resource.profile.img}
										alt={resource.profile.name}
										fill
										objectFit="contain"
										className="rounded"
									/>
								</div>
							</div>
							<div className="flex w-[calc(100%-40px)] flex-col gap-0.5">
								<p className="truncate text-xs text-gray-500">
									{resource.profile.name}
								</p>
								<p className="truncate text-xs text-gray-500">
									{resource.url}
								</p>
							</div>
						</div>
						<Button
							variant="outline"
							size="icon"
							onClick={handleBookmark}
							className="relative shrink-0"
						>
							{bookmarked ? (
								<BookmarkIconSolid className="h-4 w-4 shrink-0 fill-yellow-500 dark:fill-yellow-400" />
							) : (
								<BookmarkIconOutline className="h-4 w-4 shrink-0" />
							)}
						</Button>
					</div>
				</div>
			</a>
		</>
	)
}

export default LinkPreview
