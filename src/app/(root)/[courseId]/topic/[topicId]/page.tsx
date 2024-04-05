"use client"

import { getSlides, translateSlides } from "@/actions/hierarchy"
import ContentControls from "@/components/organisms/ContentControls"
import Slides, { SlidesSkeletonLoader } from "@/components/organisms/Slides"
import { fetchClientWithToken } from "@/services/fetch"
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
	// const [isLoading, setIsLoading] = useState<boolean>(false)
	const [language, setLanguage] = useState<string>("en")
	const { courseId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	const context = useMemo(() => {
		if (!currentTopic) return undefined
		return `I am Abhishek, a 22-year-old student based in ratlam, madhya pradesh. I enjoys coding during my free time and love listening to bollywood music. I love indian street food and enjoy tom cruise movies. Mission impossible is my all time fav movie. I like to play cricket.`
	}, [currentTopic])

	const prompt = useMemo(() => {
		if (!currentTopic) return undefined
		return `explain topic ${currentTopic.title} in ${currentTopic.cohort.title}`
	}, [currentTopic])

	const {
		isLoading: aiIsLoading,
		setInput,
		handleSubmit,
	} = useChat({
		api: "/lisa-ai/api/chat-with-functions",
		body: {
			body: { type: "explain_topic", userContext: true, context },
		},
		async onFinish(message) {
			const { slides, quiz } = JSON.parse(message.content)
			const finalSlides = [...slides, ...quiz].sort(
				(a, b) => a.priority - b.priority
			)
			let resp = await fetchClientWithToken(
				`/ai/slides/${courseId}/${topicId}`,
				{
					method: "POST",
					body: JSON.stringify({
						slides: finalSlides,
					}),
				}
			)
			setSlidesData(
				resp?.results?.data?.slides ?? {
					en: {
						slides: finalSlides,
						createdAt: new Date(),
						language: "en",
					},
				}
			)
		},
	})

	useEffect(() => {
		if (!currentTopic) return
		getSlides({
			courseId,
			topicId,
		}).then(data => {
			setSlidesData(data?.slides ?? null)
			if (slidesData || data?.slides) return

			if (prompt && !aiIsLoading) {
				setInput(prompt)
				setTimeout(() => {
					document.getElementById("submit")?.click()
				}, 1000)
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prompt, setInput, currentTopic])

	useEffect(() => {
		if (
			!slidesData ||
			slidesData?.[language] ||
			!currentTopic ||
			aiIsLoading
		)
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
				bookmarkState={currentTopic?.bookmarked}
				langDisabled={aiIsLoading}
			/>
			{slidesData ? (
				slidesData[language] ? (
					<Slides slides={slidesData[language]} />
				) : (
					<SlidesSkeletonLoader />
				)
			) : aiIsLoading ? (
				<SlidesSkeletonLoader />
			) : (
				<form onSubmit={handleSubmit}>
					<button
						type="submit"
						className="hidden"
						id="submit"
					/>
				</form>
			)}
		</div>
	)
}

export default TopicContent
