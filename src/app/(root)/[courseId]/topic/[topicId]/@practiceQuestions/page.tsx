"use client"

import { getQuestions } from "@/actions/hierarchy"
import {
	PracticeQuestionsSkeletonLoader,
	default as QuestionsArray,
} from "@/components/organisms/PracticeQuestions"
import { fetchClientWithToken } from "@/services/fetch"
import useAIStore from "@/store"
import { IPracticeQuestion } from "@/types/topic"
import { useChat } from "ai/react"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const PracticeQuestions = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const [practiceQuestions, setPracticeQuestions] = useState<
		IPracticeQuestion[] | null
	>(null)
	const { courseId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	// const [isLoading, setIsLoading] = useState(false)

	const prompt = useMemo(() => {
		return `Generate 10 Practice questions for: ${currentTopic?.title} in ${currentTopic?.cohort?.title}`
	}, [currentTopic])

	const {
		isLoading: aiIsLoading,
		setInput,
		handleSubmit,
	} = useChat({
		api: "/lisa-ai/api/chat-with-functions",
		body: {
			body: { type: "generate_questions", userContext: false },
		},
		async onFinish(message) {
			const { questions } = JSON.parse(message.content)
			const resp = await fetchClientWithToken(
				`/ai/questions/${courseId}/${topicId}`,
				{
					method: "POST",
					body: JSON.stringify({
						questions,
					}),
				}
			)
			setPracticeQuestions(
				resp?.results?.data?.questions ?? {
					questions,
				}
			)
		},
	})

	useEffect(() => {
		if (!currentTopic) return
		getQuestions({
			courseId,
			topicId,
		}).then(data => {
			setPracticeQuestions(data?.questions ?? null)
			if (practiceQuestions || data?.questions) return
			if (prompt && !aiIsLoading) {
				setInput(prompt)
				setTimeout(() => {
					document.getElementById("submit")?.click()
				}, 1000)
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTopic])

	return (
		<>
			<form onSubmit={handleSubmit}>
				<button
					type="submit"
					className="hidden"
					id="submit"
				/>
			</form>
			{practiceQuestions ? (
				<QuestionsArray questions={practiceQuestions} />
			) : aiIsLoading ? (
				<PracticeQuestionsSkeletonLoader />
			) : null}
		</>
	)
}

export default PracticeQuestions
