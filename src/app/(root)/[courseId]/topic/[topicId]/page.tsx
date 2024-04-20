"use client"

import { getSlides, translateSlides } from "@/actions/hierarchy"
import ContentControls from "@/components/organisms/ContentControls"
import Slides, { SlidesSkeletonLoader } from "@/components/organisms/Slides"
import { clientEnv } from "@/env/client"
import { getInterestStatements } from "@/lib/promptHelpers"
import { fetchClientWithToken } from "@/services/fetch"
import useAIStore from "@/store"
import { ISlideSet } from "@/types/topic"
import { IUser } from "@/types/user"
import { useChat } from "ai/react"
import { differenceInCalendarYears, differenceInSeconds } from "date-fns"
import { useParams } from "next/navigation"
import { usePostHog } from "posthog-js/react"
import { useEffect, useMemo, useState } from "react"

const TopicContent = () => {
	const currentTopic = useAIStore(store => store.currentTopic)
	const user = useAIStore(store => store.user) as IUser
	const [slidesData, setSlidesData] = useState<{
		[key: string]: ISlideSet
	} | null>(null)
	const [time, setTime] = useState<string | number | Date | null>(null)
	const [language, setLanguage] = useState<string>("en")
	const [prevLang, setPrevLang] = useState<string>("en")
	const { courseId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	const posthog = usePostHog()

	const userContext = useMemo(() => {
		let interestString = ""

		// get Random interest from user
		const interests = Object.entries(user.interests).filter(
			([_, v]) => v.length
		)
		if (interests.length) {
			const randomInterest =
				interests[Math.floor(Math.random() * interests.length)]
			interestString = getInterestStatements(
				randomInterest[0],
				randomInterest[1].join(", ")
			)
		}

		return `I am ${user?.firstname}, a ${
			user?.dob
				? differenceInCalendarYears(new Date(), new Date(user.dob))
				: "20"
		}-year-old ${user?.preferences.profession || "student"} based in ${(user?.location.city || "Mumbai", ",", user?.location.country || "India")}. ${interestString}`
	}, [user])

	const hierarchyContext = useMemo(() => {
		if (!currentTopic) return undefined
		const { cohort, subject, chapter, title } = currentTopic

		let string = `Generate 7 text slides and 3 quiz slides to explain topic ${title} `
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
			body: {
				type: "explain_topic",
				userContext: userContext,
			},
		},
		async onFinish(message) {
			posthog.capture("ai_generated", {
				hierarchy: {
					type: "topic",
					id: currentTopic?._id,
					title: currentTopic?.title,
					priority: currentTopic?.priority ?? null,
				},
				timeTaken: time
					? differenceInSeconds(new Date(), new Date(time))
					: 0,
				type: "slides",
			})
			setTime(null)

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
		onError(error: Error) {
			posthog.capture("error", {
				error,
				from: "ai_generated",
				hierarchy: {
					type: "topic",
					id: currentTopic?._id,
					title: currentTopic?.title,
					priority: currentTopic?.priority ?? null,
				},
				type: "slides",
			})
			console.error("chat-with-functions Error:", error.message)
		},
	})

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setTime(new Date())
		handleSubmit(e)
	}

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
				}, 100)
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
		}).then(resp => {
			posthog.capture("translate", {
				hierarchy: {
					type: "topic",
					id: currentTopic._id,
					title: currentTopic.title,
					priority: currentTopic.priority ?? null,
				},
				from: prevLang,
				to: language,
				timeTaken: 0,
				type: "slide",
			})
			setPrevLang(language)
			setSlidesData(resp.slides)
		})
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
				<form onSubmit={handleFormSubmit}>
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
