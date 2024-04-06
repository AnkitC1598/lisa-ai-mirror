"use client"

import { getCourse, getTopicDetails } from "@/actions/hierarchy"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HierarchyTypes from "@/constants/HierarchyTypes"
import useAIStore from "@/store"
import { THierarchyType } from "@/types/hierarchy"
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
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation"
import { useEffect, useMemo } from "react"

interface IParallelTabbedLayout {
	home: React.ReactNode
	chat: React.ReactNode
	practiceQuestions: React.ReactNode
	resources: React.ReactNode
}

const ParallelTabbedLayout: React.FC<Readonly<IParallelTabbedLayout>> = ({
	home,
	chat,
	practiceQuestions,
	resources,
}) => {
	const dispatch = useAIStore(store => store.dispatch)
	const currentTopic = useAIStore(store => store.currentTopic)
	const currentHierarchy = useAIStore(store => store.currentHierarchy)

	const searchParams = useSearchParams()
	const tab: string = searchParams.get("tab") ?? "home"
	const pathname = usePathname()
	const { replace } = useRouter()
	const { courseId: cohortId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	const handleTabSwitch = (tab: string) => {
		const params = new URLSearchParams(searchParams)
		if (tab !== "home") params.set("tab", tab)
		else params.delete("tab")

		replace(`${pathname}?${params.toString()}`)
	}

	useEffect(() => {
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
	}, [cohortId, topicId, dispatch])

	const prevTitle = useMemo(() => {
		if (!currentHierarchy || !currentTopic) return

		const prevLevel = HierarchyTypes[currentHierarchy].at(
			-2
		) as THierarchyType

		return currentTopic[prevLevel === "course" ? "cohort" : prevLevel]
			?.title
	}, [currentHierarchy, currentTopic])

	if (!currentTopic) return null

	return (
		<>
			<div className="flex flex-col justify-center gap-1 p-4 pb-0">
				<p className="line-clamp-1 text-sm text-gray-500">
					{prevTitle}
				</p>
				<p className="flex items-center gap-2 text-base font-medium">
					{currentTopic.title}
				</p>
			</div>
			<Tabs
				defaultValue={tab}
				className="flex h-full flex-col-reverse overflow-hidden"
			>
				<TabsList className="h-[unset] justify-between p-4">
					<TabsTrigger
						value="home"
						className="flex items-center justify-center gap-1 rounded-full px-4 py-2.5 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-700 dark:data-[state=active]:text-purple-100"
						onClick={() => handleTabSwitch("home")}
					>
						{tab === "home" ? (
							<>
								<QueueListIconSolid className="h-5 w-5 opacity-70" />
								<span className="text-xs">Explanation</span>
							</>
						) : (
							<QueueListIconOutline className="h-5 w-5 opacity-70" />
						)}
					</TabsTrigger>
					<TabsTrigger
						value="resources"
						className="flex gap-1 rounded-full px-4 py-2.5 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-700 dark:data-[state=active]:text-purple-100"
						onClick={() => handleTabSwitch("resources")}
					>
						{tab === "resources" ? (
							<>
								<RectangleStackIconSolid className="h-5 w-5 opacity-70" />
								<span className="text-xs">Resources</span>
							</>
						) : (
							<RectangleStackIconOutline className="h-5 w-5 opacity-70" />
						)}
					</TabsTrigger>
					<TabsTrigger
						value="practiceQuestions"
						className="flex gap-1 rounded-full px-4 py-2.5 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-700 dark:data-[state=active]:text-purple-100"
						onClick={() => handleTabSwitch("practiceQuestions")}
					>
						{tab === "practiceQuestions" ? (
							<>
								<Bars3BottomLeftIconSolid className="h-5 w-5 opacity-70" />
								<span className="text-xs">Questions</span>
							</>
						) : (
							<Bars3BottomLeftIconOutline className="h-5 w-5 opacity-70" />
						)}
					</TabsTrigger>
					<TabsTrigger
						value="chat"
						className="flex gap-1 rounded-full px-4 py-2.5 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-700 dark:data-[state=active]:text-purple-100"
						onClick={() => handleTabSwitch("chat")}
					>
						{tab === "chat" ? (
							<>
								<ChatBubbleLeftEllipsisIconSolid className="h-5 w-5 opacity-70" />
								<span className="text-xs">Chat</span>
							</>
						) : (
							<ChatBubbleLeftEllipsisIconOutline className="h-5 w-5 opacity-70" />
						)}
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value="home"
					className="mt-0 h-bottomNavScreen flex-1 overflow-hidden"
				>
					{home}
				</TabsContent>
				<TabsContent
					value="resources"
					className="mt-0 h-bottomNavScreen flex-1 overflow-y-auto pb-4 scrollbar"
				>
					{resources}
				</TabsContent>
				<TabsContent
					value="practiceQuestions"
					className="mt-0 h-bottomNavScreen flex-1 overflow-y-auto pb-4 scrollbar"
				>
					{practiceQuestions}
				</TabsContent>
				<TabsContent
					value="chat"
					className="mt-0 h-bottomNavScreen flex-1 overflow-hidden pb-4"
				>
					{chat}
				</TabsContent>
			</Tabs>
		</>
	)
}

export default ParallelTabbedLayout
