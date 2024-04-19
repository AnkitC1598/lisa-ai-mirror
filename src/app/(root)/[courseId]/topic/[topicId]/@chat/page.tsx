"use client"

import { getChats } from "@/actions/hierarchy"
import Loading from "@/components/atoms/Loading"
import { AiMessage, UserMessage } from "@/components/organisms/Message"
import { Input } from "@/components/ui/input"
import { clientEnv } from "@/env/client"
import usePaginatedAction from "@/hooks/usePaginatedAction"
import { cn } from "@/lib/utils"
import { fetchClientWithToken } from "@/services/fetch"
import useAIStore from "@/store"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useChat } from "ai/react"
import { useParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import ScrollAnchor from "./ScrollAnchor"

const Chat = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const { courseId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()
	const { ref, inView } = useInView()
	const containerRef = useRef<HTMLDivElement>(null)

	const {
		data: oldChats,
		loading,
		fetchMore,
		hasNextPage,
	} = usePaginatedAction({
		action: getChats,
		meta: { courseId, topicId },
	})

	useEffect(() => {
		if (containerRef.current) {
			const oldHeight = containerRef.current.scrollHeight
			if (inView && hasNextPage && !loading) {
				fetchMore().then(() => {
					setTimeout(() => {
						if (!containerRef.current) return
						const newHeight = containerRef.current.scrollHeight
						containerRef.current.scrollTop = newHeight - oldHeight
					}, 100)
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView])

	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat({
			api: `${clientEnv.NEXT_PUBLIC_BASE_PATH}/api/chat`,
			body: {
				topic_boundary: `${currentTopic?.title} in ${currentTopic?.cohort?.title}`,
			},
			id: topicId,
			async onFinish(message) {
				await fetchClientWithToken(`/ai/chat/${courseId}/${topicId}`, {
					method: "POST",
					body: JSON.stringify({
						isLisaAi: true,
						body: message.content,
					}),
				})
			},
			async onResponse(message) {
				await fetchClientWithToken(`/ai/chat/${courseId}/${topicId}`, {
					method: "POST",
					body: JSON.stringify({
						isLisaAi: false,
						body: input,
					}),
				})
			},
			initialMessages: oldChats.toReversed().map((chat: any) => ({
				id: chat._id,
				content: chat.body,
				role: chat.isLisaAi ? "assistant" : "user",
				createdAt: chat.createdAt,
			})),
			onError(e: Error) {
				console.error("chat Error:", e)
			},
		})

	return (
		<>
			<div className="flex h-full flex-col gap-4">
				<div
					ref={containerRef}
					className="scrollbar-both-edges flex flex-1 flex-col divide-y divide-neutral-200 overflow-y-auto scrollbar dark:divide-neutral-800"
				>
					<span
						className={cn(
							"flex w-full items-center justify-center",
							hasNextPage ? "p-4" : ""
						)}
						ref={ref}
					>
						{loading ? <Loading /> : null}
					</span>
					{messages.map(message => {
						const MessageComponent =
							message.role === "user" ? UserMessage : AiMessage
						return (
							<MessageComponent
								key={message.id}
								message={message}
								params={{ courseId, topicId }}
							/>
						)
					})}
					<ScrollAnchor trackVisibility={true} />
					{isLoading ? (
						<AiMessage
							loader
							params={{ courseId, topicId }}
							message={{
								id: "loader",
								content: "",
								role: "assistant",
								createdAt: new Date(),
							}}
						/>
					) : null}
				</div>
				<form
					onSubmit={handleSubmit}
					className="px-4"
				>
					<div className="relative">
						<Input
							placeholder="Ask me anything..."
							className="border-0 pl-0 pr-8 ring-0 focus-visible:ring-0"
							value={input}
							onChange={handleInputChange}
							disabled={isLoading}
						/>
						<button
							type="submit"
							disabled={isLoading}
							className="absolute inset-y-0 right-2 flex items-center"
						>
							<PaperAirplaneIcon className="h-4 w-4 shrink-0 opacity-50" />
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Chat
