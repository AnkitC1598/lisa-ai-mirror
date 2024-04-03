"use client"

import { getSlides, translateSlides } from "@/actions/hierarchy"
import ContentControls from "@/components/organisms/ContentControls"
import Slides, { SlidesSkeletonLoader } from "@/components/organisms/Slides"
import useAIStore from "@/store"
import { ISlideSet } from "@/types/topic"
import { useActions, useUIState } from "ai/rsc"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { type AI } from "./action"

const TopicContent = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const [messages, setMessages] = useUIState<typeof AI>()
	const { submitUserMessage } = useActions<typeof AI>()
	const [slidesData, setSlidesData] = useState<{
		[key: string]: ISlideSet
	} | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [language, setLanguage] = useState<string>("en")
	const { courseId: cohortId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	const prompt = useMemo(() => {
		if (!currentTopic) return undefined
		return `explain topic ${currentTopic.title} in ${currentTopic.cohort.title}`
	}, [currentTopic])

	useEffect(() => {
		getSlides({
			courseId: cohortId,
			topicId,
		}).then(data => {
			setSlidesData(data?.slides ?? null)

			if (slidesData || data?.slides) return

			const getData = async () => {
				// if (!prompt)
				// 	throw new Error(
				// 		"Cannot find prompt to generate explanation"
				// 	)

				setIsLoading(true)
				try {
					// Submit and get response message
					const responseMessage = await submitUserMessage({
						content: prompt,
						cohortId,
						topicId,
					})
					setMessages(currentMessages => [
						...currentMessages,
						{
							id: responseMessage.id,
							display: responseMessage.display,
							role: responseMessage.role as "user" | "assistant",
						},
					])
				} catch (error) {
					// You may want to show a toast or trigger an error state.
					console.error(error)
				} finally {
					setIsLoading(false)
				}
			}

			if (
				!messages.length &&
				!isLoading &&
				!slidesData &&
				prompt &&
				!data?.slides
			) {
				setMessages([
					{
						id: Date.now(),
						role: "user",
						display: prompt,
					},
				])
				getData()
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTopic])

	useEffect(() => {
		if (!slidesData || isLoading || slidesData?.[language] || !currentTopic)
			return
		translateSlides({
			courseId: currentTopic.cohort._id,
			topicId: currentTopic._id,
			langCode: language,
		}).then(resp => setSlidesData(resp.slides))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language, currentTopic])

	return (
		<div className="flex h-full flex-col gap-4">
			<ContentControls
				language={language}
				setLanguage={setLanguage}
			/>
			{slidesData ? (
				slidesData[language] ? (
					<Slides slides={slidesData[language]} />
				) : (
					<SlidesSkeletonLoader />
				)
			) : messages.length ? (
				messages
					.filter(t => t.role === "assistant")
					.map(message => message.display)
			) : null}
		</div>
	)
}

export default TopicContent
