"use client"

import { AiMessage, UserMessage } from "@/components/organisms/Message"
import { Input } from "@/components/ui/input"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { nanoid } from "ai"
import { useChat } from "ai/react"
import ScrollAnchor from "./ScrollAnchor"

const Chat = () => {
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat({
			api: "/lisa-ai/api/chat",
			body: {
				topic_boundary: "Anatomy of an eye in titan eye + course",
			},
			id: "lisa-ai",
			async onFinish(message) {
				await new Promise(resolve => setTimeout(resolve, 1000))
				console.log("Message", message)
			},
			async onResponse(message) {
				await new Promise(resolve => setTimeout(resolve, 1000))
				console.log("INPUT PROMPT", message, {
					role: "user",
					content: input,
				})
			},
			generateId: () => {
				let id = nanoid()
				console.debug(`🚀 ~ Chat ~ id:`, id)
				return id
			},
			initialMessages: [
				{
					id: nanoid(),
					role: "user",
					content: "explain anatomy of an eye in titan eye +",
				},
				{
					id: nanoid(),
					role: "assistant",
					content: "Sure, let me look that up for you.",
				},
			],
		})
	return (
		<>
			<div className="flex h-full flex-col gap-4">
				<div className="scrollbar-both-edges flex flex-1 flex-col divide-y divide-neutral-200 overflow-y-auto scrollbar dark:divide-neutral-800">
					{messages.map(m => {
						const Message =
							m.role === "user" ? UserMessage : AiMessage
						return (
							<div key={m.id}>
								<Message message={m.content} />
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
