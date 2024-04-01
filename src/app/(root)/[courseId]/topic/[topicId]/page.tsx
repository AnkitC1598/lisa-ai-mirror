"use client"

import { getSlides } from "@/actions/hierarchy"
import ContentControls from "@/components/organisms/ContentControls"
import Slides from "@/components/organisms/Slides"
import useAIStore from "@/store"
import { ISlides } from "@/types/topic"
import { useActions, useUIState } from "ai/rsc"
import { useEffect, useMemo, useState } from "react"
import { type AI } from "./action"

const TopicContent = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const [messages, setMessages] = useUIState<typeof AI>()
	const { submitUserMessage } = useActions<typeof AI>()
	const [slidesData, setSlidesData] = useState<ISlides | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [language, setLanguage] = useState<string>("en")

	const prompt = useMemo(() => {
		if (!currentTopic) return undefined
		return `explain topic ${currentTopic.title} in ${currentTopic.cohort.title}`
	}, [currentTopic])

	useEffect(() => {
		if (!currentTopic) return
		getSlides({
			courseId: currentTopic.cohort._id,
			topicId: currentTopic._id,
		}).then(data => setSlidesData(data))

		if (slidesData) return
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
				const responseMessage = await submitUserMessage({
					content: prompt,
					cohortId: currentTopic?.cohort?._id,
					topicId: currentTopic?._id,
				})
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
	}, [setMessages, submitUserMessage])

	return (
		<div className="flex h-full flex-col gap-4">
			<ContentControls
				language={language}
				setLanguage={setLanguage}
			/>
			{slidesData ? (
				<Slides slides={slidesData.slides[language || "en"].slides} />
			) : messages.length ? (
				messages
					.filter(t => t.role === "assistant")
					.map(message => message.display)
			) : null}
		</div>
	)
}

export default TopicContent
