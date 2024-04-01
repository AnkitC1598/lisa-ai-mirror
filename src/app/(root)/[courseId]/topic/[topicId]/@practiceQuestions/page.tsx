"use client"

import { useActions, useUIState } from "ai/rsc"
import { useEffect, useState } from "react"
import { AI } from "./action"

const PracticeQuestions = () => {
	const [messages, setMessages] = useUIState<typeof AI>()
	const { generatePracticeQuestions } = useActions<typeof AI>()

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setMessages(currentMessages => [
			...currentMessages,
			{
				id: Date.now(),
				role: "user",
				display:
					"Generate Practice questions for: What is Web Development? in english, which is a topic in HTML & CSS Zero to Hero (5 Days)",
			},
		])
		const getData = async () => {
			setIsLoading(true)
			try {
				// Submit and get response message
				const responseMessage = await generatePracticeQuestions(
					"Generate Practice questions for: What is Web Development? in english, which is a topic in HTML & CSS Zero to Hero (5 Days)"
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
