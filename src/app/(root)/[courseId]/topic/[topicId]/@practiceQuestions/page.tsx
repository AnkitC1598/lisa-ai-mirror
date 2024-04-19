"use client"

import { getQuestions } from "@/actions/hierarchy"
import {
	PracticeQuestionsSkeletonLoader,
	default as QuestionsArray,
} from "@/components/organisms/PracticeQuestions"
import { clientEnv } from "@/env/client"
import { fetchClientWithToken } from "@/services/fetch"
import useAIStore from "@/store"
import { IPracticeQuestion } from "@/types/topic"
import { useChat } from "ai/react"
import { useParams } from "next/navigation"
import { usePostHog } from "posthog-js/react"
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
	const posthog = usePostHog()

	// const [isLoading, setIsLoading] = useState(false)

	const hierarchyContext = useMemo(() => {
		if (!currentTopic) return undefined
		const { cohort, subject, chapter, title } = currentTopic

		let string = `Generate 10 Practice questions for: ${title} `
		if (chapter) string += `in ${chapter.title} `
		else if (subject) string += `in ${subject.title} `
		string += `under ${cohort.title} course.`

		return string
	}, [currentTopic])

	const {
		isLoading: aiIsLoading,
		setInput,
		handleSubmit,
	} = useChat({
		api: `${clientEnv.NEXT_PUBLIC_BASE_PATH}/api/chat-with-functions`,
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
			posthog.capture("questions_generated")
			setPracticeQuestions(
				resp?.results?.data?.questions ?? {
					questions,
				}
			)
		},
		onError(e: Error) {
			console.error("chat-with-functions Error:", e)
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
			if (hierarchyContext && !aiIsLoading) {
				setInput(hierarchyContext)
				setTimeout(() => {
					document.getElementById("submit")?.click()
				}, 100)
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTopic])

	return (
		<>
			{practiceQuestions ? (
				<QuestionsArray questions={practiceQuestions} />
			) : aiIsLoading ? (
				<PracticeQuestionsSkeletonLoader />
			) : (
				<form onSubmit={handleSubmit}>
					<button
						type="submit"
						className="hidden"
						id="submit"
					/>
				</form>
			)}
		</>
	)
}

export default PracticeQuestions
