"use client"

import { getCourse, getTopicDetails } from "@/actions/hierarchy"
import Loading from "@/components/atoms/Loading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CohortHierarchyTypes } from "@/constants/HierarchyTypes"
import { cn } from "@/lib"
import PageTransitionProvider from "@/providers/pageTransitionProvider"
import useAIStore from "@/store"
import { TCohortHierarchyType } from "@/types/hierarchy"
import {
	Bars3BottomLeftIcon as Bars3BottomLeftIconSolid,
	ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid,
	QueueListIcon as QueueListIconSolid,
	RectangleStackIcon as RectangleStackIconSolid,
} from "@heroicons/react/20/solid"
import {
	Bars3BottomLeftIcon as Bars3BottomLeftIconOutline,
	ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconOutline,
	QueueListIcon as QueueListIconOutline,
	RectangleStackIcon as RectangleStackIconOutline,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation"
import { usePostHog } from "posthog-js/react"
import { useEffect, useMemo, useState } from "react"

const TABS = [
	{
		label: "Explanation",
		icon: { solid: QueueListIconSolid, outline: QueueListIconOutline },
		key: "explanation",
	},
	{
		label: "Resources",
		icon: {
			solid: RectangleStackIconSolid,
			outline: RectangleStackIconOutline,
		},
		key: "resources",
	},
	{
		label: "Questions",
		icon: {
			solid: Bars3BottomLeftIconSolid,
			outline: Bars3BottomLeftIconOutline,
		},
		key: "practiceQuestions",
	},
	{
		label: "Chat",
		icon: {
			solid: ChatBubbleLeftEllipsisIconSolid,
			outline: ChatBubbleLeftEllipsisIconOutline,
		},
		key: "chat",
	},
]

type TFrom = "curriculum" | "recent" | "suggestion" | "bookmark"

const sourceOptions: Record<TFrom, string> = {
	curriculum: "Curriculum",
	recent: "Recent Topic",
	suggestion: "Suggestions",
	bookmark: "Bookmarks",
}

interface ITopicContentLayout {
	children: React.ReactNode
	chat: React.ReactNode
	practiceQuestions: React.ReactNode
	resources: React.ReactNode
}

const TopicContentLayout: React.FC<Readonly<ITopicContentLayout>> = ({
	children,
	chat,
	practiceQuestions,
	resources,
}) => {
	const dispatch = useAIStore(store => store.dispatch)
	const currentTopic = useAIStore(store => store.currentTopic)
	const currentHierarchy = useAIStore(store => store.currentHierarchy)

	const Components: Record<string, React.ReactNode> = {
		explanation: children,
		chat: chat,
		practiceQuestions: practiceQuestions,
		resources: resources,
	}

	const searchParams = useSearchParams()
	const currentTab: string = searchParams.get("tab") ?? "explanation"
	const from = (searchParams.get("from") ?? "curriculum") as TFrom
	const pathname = usePathname()
	const { replace } = useRouter()
	const { courseId: cohortId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()
	const [loading, setLoading] = useState<boolean>(false)

	const posthog = usePostHog()

	const handleTabSwitch = (tab: string) => {
		const params = new URLSearchParams(searchParams)
		if (tab !== "explanation") params.set("tab", tab)
		else params.delete("tab")

		replace(`${pathname}?${params.toString()}`)
	}

	useEffect(() => {
		posthog.capture("topic_page_source", {
			source: sourceOptions[from],
		})
		setLoading(true)
		getCourse({ cohortId })
			.then(course => {
				dispatch({
					type: "SET_STATE",
					payload: {
						currentHierarchy: course.type.map(t => t[0]).join(""),
					},
				})
			})
			.then(() => {
				getTopicDetails({ topicId }).then(resp => {
					dispatch({
						type: "SET_STATE",
						payload: {
							currentTopic: resp,
						},
					})

					setLoading(false)
				})
			})

		return () => {
			dispatch({
				type: "SET_STATE",
				payload: {
					currentHierarchy: null,
					currentTopic: null,
				},
			})
		}
	}, [cohortId, topicId, dispatch, from, posthog])

	const prevHierarchy = useMemo(() => {
		if (!currentHierarchy || !currentTopic) return

		const prevLevel = CohortHierarchyTypes[currentHierarchy].at(
			-2
		) as TCohortHierarchyType
		let prevRoute = [""]
		CohortHierarchyTypes[currentHierarchy].forEach((level: string) =>
			currentTopic[level]
				? prevRoute.push(currentTopic[level]?._id)
				: null
		)
		return {
			title: currentTopic[prevLevel]?.title,
			route: prevRoute.join("/"),
		}
	}, [currentHierarchy, currentTopic])

	if (!currentTopic || loading)
		return (
			<div className="flex h-full w-full items-center justify-center py-8">
				<Loading icon />
			</div>
		)

	return (
		<>
			<div className="flex h-full flex-col gap-4 overflow-hidden">
				<div className="flex flex-col justify-center gap-1 p-4 pb-0">
					<Link
						href={prevHierarchy?.route ?? "/"}
						className="line-clamp-1 text-sm text-gray-500"
					>
						{prevHierarchy?.title}
					</Link>
					<p className="flex items-center gap-2 text-base font-medium">
						{currentTopic.title}
					</p>
				</div>
				<Tabs
					defaultValue={currentTab}
					className="flex h-full flex-col-reverse overflow-hidden"
				>
					<TabsList className="h-[unset] justify-between bg-neutral-50 p-4 dark:bg-neutral-950">
						{TABS.map(tab => (
							<TabsTrigger
								key={`${tab.key}_tab`}
								value={tab.key}
								className="flex items-center justify-center gap-1 rounded-full px-4 py-2.5 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-700 dark:data-[state=active]:text-purple-100"
								onClick={() => handleTabSwitch(tab.key)}
							>
								{currentTab === tab.key ? (
									<>
										<tab.icon.solid className="h-5 w-5 opacity-70" />
										<span className="text-xs">
											{tab.label}
										</span>
									</>
								) : (
									<tab.icon.outline className="h-5 w-5 opacity-70" />
								)}
							</TabsTrigger>
						))}
					</TabsList>
					{TABS.map((tab, idx) => (
						<TabsContent
							key={`${tab.key}_content`}
							value={tab.key}
							className={cn(
								"mt-0 h-bottomNavScreen flex-1",
								idx === 0
									? "overflow-hidden"
									: idx === TABS.length - 1
										? "overflow-hidden pb-4"
										: "overflow-y-auto pb-4 scrollbar"
							)}
						>
							<PageTransitionProvider>
								{Components[tab.key]}
							</PageTransitionProvider>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</>
	)
}

export default TopicContentLayout
