"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	Bars3BottomLeftIcon,
	ChatBubbleLeftEllipsisIcon,
	HomeIcon,
	RectangleStackIcon,
} from "@heroicons/react/16/solid"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

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
	const searchParams = useSearchParams()
	const tab: string = searchParams.get("tab") ?? "home"
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleTabSwitch = (tab: string) => {
		const params = new URLSearchParams(searchParams)
		if (tab !== "home") params.set("tab", tab)
		else params.delete("tab")

		replace(`${pathname}?${params.toString()}`)
	}
	return (
		<>
			<Tabs
				defaultValue={tab}
				className="flex h-full flex-col-reverse overflow-hidden"
			>
				<TabsList className="h-[unset] justify-between p-4">
					<TabsTrigger
						value="home"
						className="flex gap-1 rounded-full px-4 py-2.5 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-700 dark:data-[state=active]:text-purple-100"
						onClick={() => handleTabSwitch("home")}
					>
						<HomeIcon className="h-4 w-4" />
						{tab === "home" ? (
							<span className="text-xs">Home</span>
						) : null}
					</TabsTrigger>
					<TabsTrigger
						value="resources"
						className="flex gap-1 rounded-full px-4 py-2.5 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-700 dark:data-[state=active]:text-purple-100"
						onClick={() => handleTabSwitch("resources")}
					>
						<RectangleStackIcon className="h-4 w-4" />
						{tab === "resources" ? (
							<span className="text-xs">Resources</span>
						) : null}
					</TabsTrigger>
					<TabsTrigger
						value="practiceQuestions"
						className="flex gap-1 rounded-full px-4 py-2.5 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-700 dark:data-[state=active]:text-purple-100"
						onClick={() => handleTabSwitch("practiceQuestions")}
					>
						<Bars3BottomLeftIcon className="h-4 w-4" />
						{tab === "practiceQuestions" ? (
							<span className="text-xs">Practice Questions</span>
						) : null}
					</TabsTrigger>
					<TabsTrigger
						value="chat"
						className="flex gap-1 rounded-full px-4 py-2.5 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-700 dark:data-[state=active]:text-purple-100"
						onClick={() => handleTabSwitch("chat")}
					>
						<ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
						{tab === "chat" ? (
							<span className="text-xs">Chat</span>
						) : null}
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
