"use client"

import { getSlides, translateSlides } from "@/actions/hierarchy"
import ContentControls from "@/components/organisms/ContentControls"
import Slides, { SlidesSkeletonLoader } from "@/components/organisms/Slides"
import { getInterestStatements } from "@/lib/promptHelpers"
import { fetchClientWithToken } from "@/services/fetch"
import useAIStore from "@/store"
import { ISlideSet } from "@/types/topic"
import { IUser } from "@/types/user"
import { useChat } from "ai/react"
import { differenceInCalendarYears } from "date-fns"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const TopicContent = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const user = useAIStore(store => store.user) as IUser
	const [slidesData, setSlidesData] = useState<{
		[key: string]: ISlideSet
	} | null>(null)
	// const [isLoading, setIsLoading] = useState<boolean>(false)
	const [language, setLanguage] = useState<string>("en")
	const { courseId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	const userContext = useMemo(() => {
		let interestString = ""
		Object.entries(user.interests).forEach(([key, value]) => {
			interestString += value.length
				? getInterestStatements(key, value.join(", ")) + " "
				: ""
		})

		return `I am ${user?.firstname}, a ${
			user?.dob
				? differenceInCalendarYears(new Date(), new Date(user.dob))
				: "20"
		}-year-old ${user?.preferences.profession || "student"} based in ${(user?.location.city || "Mumbai", ",", user?.location.country || "India")}. ${interestString}`
	}, [user])

	const hierarchyContext = useMemo(() => {
		if (!currentTopic) return undefined
		const { cohort, subject, chapter, title } = currentTopic

		let string = `explain topic ${title} `
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
		api: "/lisa-ai/api/chat-with-functions",
		body: {
			body: {
				type: "explain_topic",
				userContext: userContext,
			},
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

			if (hierarchyContext && !aiIsLoading) {
				setInput(hierarchyContext)
				setTimeout(() => {
					document.getElementById("submit")?.click()
				}, 1000)
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTopic])

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
