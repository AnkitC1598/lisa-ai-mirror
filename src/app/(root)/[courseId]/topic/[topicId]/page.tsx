"use client"

import { translateSlides } from "@/actions/hierarchy"
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

	const {
		isLoading: aiIsLoading,
		setInput,
		handleSubmit,
	} = useChat({
		api: "/lisa-ai/api/chat-with-functions",
		body: {
			cohortId,
			topicId,
		},
		onFinish(message) {
			const { slides, quiz } = JSON.parse(message.content)
			const finalSlides = [...slides, ...quiz].sort(
				(a, b) => a.priority - b.priority
			)
			setSlidesData({
				en: {
					slides: finalSlides,
					createdAt: new Date(),
					language: "en",
				},
			})
		},
	})

	const prompt = useMemo(() => {
		if (!currentTopic) return undefined
		return `explain topic ${currentTopic.title} in ${currentTopic.cohort.title}`
	}, [currentTopic])

	useEffect(() => {
		if (prompt) {
			setInput(prompt)
			setTimeout(() => {
				document.getElementById("submit")?.click()
			}, 1000)
			setIsLoading(true)
		}
	}, [prompt, setInput])

	// useEffect(() => {
	// 	getSlides({
	// 		courseId: cohortId,
	// 		topicId,
	// 	}).then(data => {
	// 		setSlidesData(data?.slides ?? null)

	// 		if (slidesData || data?.slides) return

	// 		const getData = async () => {
	// 			// if (!prompt)
	// 			// 	throw new Error(
	// 			// 		"Cannot find prompt to generate explanation"
	// 			// 	)

	// 			setIsLoading(true)
	// 			try {
	// 				// Submit and get response message
	// 				const responseMessage = await submitUserMessage({
	// 					content: prompt,
	// 					cohortId,
	// 					topicId,
	// 				})
	// 				setMessages(currentMessages => [
	// 					...currentMessages,
	// 					{
	// 						id: responseMessage.id,
	// 						display: responseMessage.display,
	// 						role: responseMessage.role as "user" | "assistant",
	// 					},
	// 				])
	// 			} catch (error) {
	// 				// You may want to show a toast or trigger an error state.
	// 				console.error(error)
	// 			} finally {
	// 				setIsLoading(false)
	// 			}
	// 		}

	// 		if (
	// 			!messages.length &&
	// 			!isLoading &&
	// 			!slidesData &&
	// 			prompt &&
	// 			!data?.slides
	// 		) {
	// 			setMessages([
	// 				{
	// 					id: Date.now(),
	// 					role: "user",
	// 					display: prompt,
	// 				},
	// 			])
	// 			getData()
	// 		}
	// 	})
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [currentTopic])

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
			<form onSubmit={handleSubmit}>
				<button
					type="submit"
					className="hidden"
					id="submit"
				/>
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
			) : aiIsLoading ? (
				<SlidesSkeletonLoader />
			) : null}
		</div>
	)
}

export default TopicContent
