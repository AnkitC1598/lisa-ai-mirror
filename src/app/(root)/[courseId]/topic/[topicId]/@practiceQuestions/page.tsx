"use client"

import { getQuestions } from "@/actions/hierarchy"
import {
	PracticeQuestionsSkeletonLoader,
	default as QuestionsArray,
} from "@/components/organisms/PracticeQuestions"
import useAIStore from "@/store"
import { IPracticeQuestion } from "@/types/topic"
import { useActions, useUIState } from "ai/rsc"
import { useEffect, useMemo, useState } from "react"
import { AI } from "./action"

const PracticeQuestions = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const [practiceQuestions, setPracticeQuestions] = useState<
		IPracticeQuestion[] | null
	>(null)
	const [messages, setMessages] = useUIState<typeof AI>()
	const { generatePracticeQuestions } = useActions<typeof AI>()

	const [isLoading, setIsLoading] = useState(false)
	const prompt = useMemo(() => {
		return `Generate 10 Practice questions for: ${currentTopic?.title} in ${currentTopic?.cohort?.title}`
	}, [currentTopic])

	useEffect(() => {
		if (!currentTopic) return
		getQuestions({
			courseId: currentTopic.cohort._id,
			topicId: currentTopic._id,
		}).then(data => {
			setPracticeQuestions(data?.questions ?? null)

			if (data?.questions) return
			const getData = async () => {
				setIsLoading(true)
				try {
					// Submit and get response message
					const responseMessage = await generatePracticeQuestions({
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
			if (
				!isLoading &&
				(!practiceQuestions || !data?.questions) &&
				prompt
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

	return (
		<>
			{practiceQuestions ? (
				<QuestionsArray questions={practiceQuestions} />
			) : messages.length ? (
				messages
					.filter(t => t.role === "assistant")
					.map(message => message.display)
			) : (
				<PracticeQuestionsSkeletonLoader />
			)}
		</>
	)
}

export default PracticeQuestions
