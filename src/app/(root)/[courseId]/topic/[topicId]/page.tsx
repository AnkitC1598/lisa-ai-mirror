"use client"

import ContentControls from "@/components/organisms/ContentControls"
import Slides, { SlidesSkeletonLoader } from "@/components/organisms/Slides"
import useAIStore from "@/store"
import { ISlideSet } from "@/types/topic"
import { useChat } from "ai/react"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const TopicContent = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const [slidesData, setSlidesData] = useState<{
		[key: string]: ISlideSet
	} | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [language, setLanguage] = useState<string>("en")
	const { courseId: cohortId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()
	const { messages, setInput, handleSubmit, stop } = useChat({
		api: "/lisa-ai/api/functions",
		body: {
			cohortId,
			topicId,
		},
		onFinish(message) {
			// stop()
			console.log("AIAPI FINISHED", message)
		},
		onResponse(response) {
			console.log("AIAPI RESPONSE", response)
		},
	})

	const prompt = useMemo(() => {
		if (!currentTopic) return ""
		return `explain topic ${currentTopic.title} in ${currentTopic.cohort.title}`
	}, [currentTopic])

	useEffect(() => {
		// getSlides({
		// 	courseId: cohortId,
		// 	topicId,
		// }).then(data => {
		// 	setSlidesData(data?.slides ?? null)

		// if (slidesData) return
		setInput(prompt)
		console.debug(`🚀 ~AIAPI useEffect ~ setInput:`, "CLICKED ")
		setTimeout(() => {
			document.getElementById("submit")?.click()
		}, 1000)
		setIsLoading(true)
		// })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTopic])

	// useEffect(() => {
	// 	if (!slidesData || isLoading || slidesData?.[language] || !currentTopic)
	// 		return
	// 	translateSlides({
	// 		courseId: currentTopic.cohort._id,
	// 		topicId: currentTopic._id,
	// 		langCode: language,
	// 	}).then(resp => setSlidesData(resp.slides))
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [language, currentTopic])

	return (
		<div className="flex h-full flex-col gap-4">
			<form onSubmit={handleSubmit}>
				<button
					type="submit"
					className="hidden"
					id="submit"
				></button>
			</form>
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
					// .filter(t => t.role === "assistant")
					.map(message => message.content)
			) : null}
		</div>
	)
}

export default TopicContent
