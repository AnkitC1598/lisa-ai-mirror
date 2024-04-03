"use client"

import { getChats } from "@/actions/hierarchy"
import { AiMessage, UserMessage } from "@/components/organisms/Message"
import { Input } from "@/components/ui/input"
import { handleVote } from "@/lib/interactions"
import { fetchClientWithToken } from "@/services/fetch"
import useAIStore from "@/store"
import { IChat } from "@/types/topic"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useChat } from "ai/react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ScrollAnchor from "./ScrollAnchor"

const Chat = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const [oldChats, setOldChats] = useState<IChat[] | []>([])
	const { courseId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	useEffect(() => {
		getChats({
			courseId,
			topicId,
		}).then(chats => {
			setOldChats(
				chats.reverse().map(chat => {
					return {
						id: chat._id,
						content: chat.body,
						role: chat.isLisaAi ? "assistant" : "user",
						createdAt: chat.createdAt,
					}
				})
			)
		})
	}, [courseId, currentTopic, topicId])

	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat({
			api: "/lisa-ai/api/chat",
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
			initialMessages: oldChats,
		})

	const handleFeedback = (
		messageId: string,
		feedback: string,
		vote: string,
		setVote: () => void
	) => {
		handleVote({
			type: "chat",
			courseId: courseId,
			topicId,
			id: messageId,
			vote,
			setVote,
			body: {
				feedback,
			},
		})
	}

	return (
		<>
			<div className="flex h-full flex-col gap-4">
				<div className="scrollbar-both-edges flex flex-1 flex-col divide-y divide-neutral-200 overflow-y-auto scrollbar dark:divide-neutral-800">
					{messages.map(message => {
						const MessageComponent =
							message.role === "user" ? UserMessage : AiMessage
						return (
							<div key={message.id}>
								<MessageComponent
									message={message}
									// @ts-ignore
									handleFeedback={handleFeedback}
								/>
							</div>
						)
					})}
					<ScrollAnchor trackVisibility={true} />
				</div>
				<form
					onSubmit={handleSubmit}
					className="px-4"
				>
					<div className="relative">
						<Input
							placeholder="Ask me anything..."
							className="pr-8"
							value={input}
							onChange={handleInputChange}
							disabled={isLoading}
							// onChange={e => {
							// 	handleSearch(e.target.value)
							// }}
							// defaultValue={searchParams.get("query")?.toString()}
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
