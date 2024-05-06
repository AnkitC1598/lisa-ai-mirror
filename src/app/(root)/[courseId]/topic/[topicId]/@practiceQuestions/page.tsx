"use client"

import { generateAiResponse } from "@/actions/ai"
import { getQuestions } from "@/actions/hierarchy"
import {
	PracticeQuestionsSkeletonLoader,
	default as QuestionsArray,
} from "@/components/organisms/PracticeQuestions"
import { fetchClientWithToken } from "@/services/fetch"
import useAIStore from "@/store"
import { IPracticeQuestion } from "@/types/topic"
import { differenceInSeconds } from "date-fns"
import { useParams } from "next/navigation"
import { usePostHog } from "posthog-js/react"
import { useEffect, useMemo, useState } from "react"

const PracticeQuestions = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const [practiceQuestions, setPracticeQuestions] = useState<
		IPracticeQuestion[] | null
	>(null)
	const [time, setTime] = useState<string | number | Date | null>(null)
	const [aiIsLoading, setAiIsLoading] = useState<boolean>(false)
	const { courseId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	const posthog = usePostHog()

	const hierarchyContext = useMemo(() => {
		if (!currentTopic) return undefined
		const { cohort, subject, chapter, title } = currentTopic

		let string = `Generate 10 Practice questions for: ${title} `
		if (chapter) string += `in ${chapter.title} `
		else if (subject) string += `in ${subject.title} `
		string += `under ${cohort.title} course.`

		return string
	}, [currentTopic])

	useEffect(() => {
		if (!currentTopic || aiIsLoading) return
		getQuestions({
			courseId,
			topicId,
		}).then(data => {
			setPracticeQuestions(data?.questions ?? null)
			if (practiceQuestions || data?.questions) return
			if (hierarchyContext) {
				setAiIsLoading(true)
				setTime(new Date())
				generateAiResponse({
					context: hierarchyContext ?? "",
					provider: "anthropic",
					model: "claude-3-haiku-20240307",
					promptType: "questions",
				})
					.then(async (object: any) => {
						const { questions } = object
						const body = JSON.stringify({
							questions,
						})
						const resp = await fetchClientWithToken(
							`/ai/questions/${courseId}/${topicId}`,
							{
								method: "POST",
								body,
							}
						)
						posthog.capture("ai_generated", {
							hierarchy: {
								type: "topic",
								id: currentTopic?._id,
								title: currentTopic?.title,
								priority: currentTopic?.priority ?? null,
							},
							timeTaken: time
								? differenceInSeconds(
										new Date(),
										new Date(time)
									)
								: 0,
							type: "questions",
						})
						setTime(null)
						setPracticeQuestions(
							resp?.results?.data?.questions ?? {
								questions,
							}
						)
					})
					.catch((error: Error) => {
						posthog.capture("error", {
							error,
							from: "ai_generated",
							hierarchy: {
								type: "topic",
								id: currentTopic?._id,
								title: currentTopic?.title,
								priority: currentTopic?.priority ?? null,
							},
							type: "questions",
						})
						console.error("chat-with-functions Error:", error)
					})
					.finally(() => setAiIsLoading(false))
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
			) : null}
		</>
	)
}

export default PracticeQuestions
