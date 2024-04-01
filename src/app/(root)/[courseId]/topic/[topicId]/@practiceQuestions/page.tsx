"use client"

import useAIStore from "@/store"
import { useActions, useUIState } from "ai/rsc"
import { useEffect, useMemo, useState } from "react"
import { AI } from "./action"

const PracticeQuestions = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const [messages, setMessages] = useUIState<typeof AI>()
	const { generatePracticeQuestions } = useActions<typeof AI>()

	const [isLoading, setIsLoading] = useState(false)

	const prompt = useMemo(() => {
		return `Generate 10 Practice questions for: ${currentTopic?.title} in ${currentTopic?.cohort?.title}`
	}, [currentTopic])

	useEffect(() => {
		setMessages(currentMessages => [
			...currentMessages,
			{
				id: Date.now(),
				role: "user",
				display: prompt,
			},
		])
		const getData = async () => {
			setIsLoading(true)
			try {
				// Submit and get response message
				const responseMessage = await generatePracticeQuestions(prompt)
				setMessages(currentMessages => [
					...currentMessages,
					{
						id: responseMessage.id,
						display: responseMessage.display,
						role: responseMessage.role as "user" | "assistant",
					},
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
	}, [setMessages, generatePracticeQuestions])

	return (
		<>
			<div className="px-4">
				{messages.length
					? messages
							.filter(t => t.role === "assistant")
							.map(message => message.display)
					: null}
			</div>
		</>
	)
}

export default PracticeQuestions
