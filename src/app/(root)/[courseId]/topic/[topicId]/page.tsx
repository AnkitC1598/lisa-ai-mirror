"use client"

import ContentControls from "@/components/organisms/ContentControls"
import { useActions, useUIState } from "ai/rsc"
import { useEffect, useState } from "react"
import { type AI } from "./action"

const TopicContent = () => {
	const [messages, setMessages] = useUIState<typeof AI>()
	const { submitUserMessage } = useActions<typeof AI>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setMessages(currentMessages => [
			...currentMessages,
			{
				id: Date.now(),
				role: "user",
				display: "explain anatomy of an eye in titan eye +",
			},
		])
		const getData = async () => {
			setIsLoading(true)
			try {
				// Submit and get response message
				const responseMessage = await submitUserMessage(
					"explain anatomy of an eye in titan eye +"
				)
				// @ts-ignore
				setMessages(currentMessages => [
					...currentMessages,
					responseMessage,
				])
				setIsLoading(false)
			} catch (error) {
				// You may want to show a toast or trigger an error state.
				console.error(error)
				setIsLoading(false)
			}
		}
		if (!messages.length && !isLoading) getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setMessages, submitUserMessage])

	return (
		<div className="flex h-full flex-col gap-4">
			<ContentControls />
			{messages.length
				? messages
						.filter(t => t.role === "assistant")
						.map(message => message.display)
				: null}
		</div>
	)
}

export default TopicContent
