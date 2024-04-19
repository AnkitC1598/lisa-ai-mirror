"use client"

import { getChats } from "@/actions/hierarchy"
import { AiMessage, UserMessage } from "@/components/organisms/Message"
import { Input } from "@/components/ui/input"
import { clientEnv } from "@/env/client"
import { fetchClientWithToken } from "@/services/fetch"
import useAIStore from "@/store"
import { IChat } from "@/types/topic"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useChat } from "ai/react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ScrollAnchor from "./ScrollAnchor"

const baseMessages = [
	"Hey can you brief me about this topic?",
	"Give a few examples of this topic",
	"What can you help me with?",
]

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

	const {
		messages,
		input,
		setInput,
		handleInputChange,
		handleSubmit,
		isLoading,
	} = useChat({
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
		initialMessages: oldChats,
		onError(e: Error) {
			console.error("chat Error:", e)
		},
	})

	return (
		<>
			<div className="flex h-full flex-col gap-4">
				<div className="scrollbar-both-edges flex flex-1 flex-col divide-y divide-neutral-200 overflow-y-auto scrollbar dark:divide-neutral-800">
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
					) : !messages.length ? (
						<div className="mt-auto grid grid-cols-2 gap-2 px-4">
							{baseMessages.map(message => (
								<button
									key={message}
									className="flex cursor-pointer flex-col rounded-lg border border-neutral-200 bg-white p-4 transition-all hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950 dark:hover:bg-neutral-900"
									onClick={() => {
										setInput(message)
										setTimeout(() => {
											document
												.getElementById("submit")
												?.click()
										}, 100)
									}}
								>
									<div className="text-left text-sm">
										{message}
									</div>
								</button>
							))}
						</div>
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
							autoFocus
						/>
						<button
							type="submit"
							id="submit"
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
