"use client"

import { AiMessage, UserMessage } from "@/components/organisms/Message"
import { Input } from "@/components/ui/input"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import ScrollAnchor from "./ScrollAnchor"

const Chat = () => {
	return (
		<>
			<div className="flex h-full flex-col gap-4">
				<div className="scrollbar-both-edges flex flex-1 flex-col divide-y divide-neutral-200 overflow-y-auto scrollbar dark:divide-neutral-800">
					<UserMessage />
					<AiMessage />
					<UserMessage />
					<AiMessage />
					<UserMessage />
					<AiMessage />
					<UserMessage />
					<AiMessage />
					<UserMessage />
					<AiMessage />
					<ScrollAnchor trackVisibility={true} />
				</div>
				<div className="px-4">
					<div className="relative">
						<Input
							placeholder="Ask me anything..."
							className="pr-8"
							// onChange={e => {
							// 	handleSearch(e.target.value)
							// }}
							// defaultValue={searchParams.get("query")?.toString()}
						/>
						<div className="absolute inset-y-0 right-2 flex items-center">
							<PaperAirplaneIcon className="h-4 w-4 shrink-0 opacity-50" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Chat
