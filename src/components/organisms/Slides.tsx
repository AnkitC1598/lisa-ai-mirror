"use client"

import { answerQuiz } from "@/actions/hierarchy"
import useTextToSpeech from "@/hooks/useTextToSpeech"
import { handleVote } from "@/lib/interactions"
import { cn } from "@/lib/utils"
import { SetState } from "@/types"
import { IAnswer, ISlide } from "@/types/topic"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid"
import {
	HandThumbDownIcon as HandThumbDownIconOutline,
	HandThumbUpIcon as HandThumbUpIconOutline,
	SpeakerWaveIcon as SpeakerWaveIconOutline,
} from "@heroicons/react/24/outline"
import {
	HandThumbDownIcon as HandThumbDownIconSolid,
	HandThumbUpIcon as HandThumbUpIconSolid,
	SpeakerWaveIcon as SpeakerWaveIconSolid,
} from "@heroicons/react/24/solid"
import { useParams } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import ContentPagination from "./ContentPagination"

const Alphabets: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

interface ISlidesProps {
	slides: {
		slides: ISlide[]
		language?: string
	}
}

export interface ISlideState {
	current: number
	finished: number[]
}

const Slides: React.FC<ISlidesProps> = ({ slides }) => {
	const [slideState, setSlideState] = useState<ISlideState>({
		current: 0,
		finished: [
			...slides.slides
				.map((s, i) => (s?.userAnswer ? i : -1))
				.filter(v => v > -1),
		],
	})
	const { courseId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	const handleQuizOption = ({
		answer,
		idx,
		answers,
	}: {
		answer: IAnswer
		idx: number
		answers: IAnswer[]
	}) => {
		setSlideState(prev => ({
			...prev,
			finished: [...prev.finished, idx],
		}))
		answers.forEach((ans: any) => {
			const element = document.getElementById(ans.body)
			if (element) {
				element.classList.remove(
					"border-green-300",
					"bg-green-100",
					"text-green-700",
					"dark:border-green-700",
					"dark:bg-green-800",
					"dark:text-green-200",
					"border-red-300",
					"bg-red-100",
					"text-red-700",
					"dark:border-red-700",
					"dark:bg-red-800",
					"dark:text-red-200"
				)
				if ((answer.isCorrect && answer === ans) || ans.isCorrect)
					element.classList.add(
						"border-green-300",
						"bg-green-100",
						"text-green-700",
						"dark:border-green-700",
						"dark:bg-green-800",
						"dark:text-green-200"
					)
				else if (!answer.isCorrect && answer === ans)
					element.classList.add(
						"border-red-300",
						"bg-red-100",
						"text-red-700",
						"dark:border-red-700",
						"dark:bg-red-800",
						"dark:text-red-200"
					)
			}
		})
		answerQuiz({
			courseId: courseId,
			topicId,
			langCode: slides.language,
			questionId: slides.slides[idx].id,
			answerId: answer.id,
		})
	}

	return (
		<div className="flex h-[calc(100%-70px)] flex-1">
			<ContentPagination
				vertical
				slideState={slideState}
				total={slides.slides.length}
			/>
			<div
				id="slidesContainer"
				className="flex-1 snap-y snap-mandatory space-y-4 overflow-y-auto pb-4 pl-1 pr-4 scrollbar-hide"
			>
				{slides.slides.map((slide, idx) => (
					<Slide
						key={`${idx}_${slide.id}`}
						idx={idx}
						slide={slide}
						setSlideState={setSlideState}
						handleQuizOption={handleQuizOption}
						params={{ courseId, topicId }}
						langCode={slides.language}
						isLastSlide={idx === slides.slides.length - 1}
						// handleRecordSlideDuration={handleRecordSlideDuration}
					/>
				))}
			</div>
		</div>
	)
}

export default Slides

// Create a skeleton loader for the slides
export const SlidesSkeletonLoader = () => {
	return (
		<div className="flex h-[80%] p-4">
			<div
				className={cn(
					"relative flex h-full w-full snap-center snap-always flex-col items-start gap-2 overflow-hidden rounded-md bg-white p-4 shadow-md ring-1 ring-inset ring-neutral-200 scrollbar-hide dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-500/20"
				)}
			>
				<Skeleton className="h-5 w-full" />
				<Skeleton className="h-5 w-[75%]" />
				<Skeleton className="mt-4 h-5 w-full" />
				<Skeleton className="h-5 w-[87%]" />
				<Skeleton className="h-5 w-full" />
				<Skeleton className="h-5 w-[92%]" />
				<Skeleton className="h-5 w-[75%]" />
				<Skeleton className="h-5 w-[87%]" />
				<Skeleton className="h-5 w-full" />
				<Skeleton className="h-5 w-[92%]" />
				<Skeleton className="h-5 w-[75%]" />
			</div>
		</div>
	)
}

interface ISlideProps {
	idx?: number
	slide: ISlide
	setSlideState: SetState<ISlideState>
	handleQuizOption: Function
	params: {
		courseId: string
		topicId: string
	}
	langCode?: string
	isLastSlide?: boolean
	// handleRecordSlideDuration?: Function
}

const Slide: React.FC<ISlideProps> = ({
	idx = 0,
	slide,
	setSlideState,
	handleQuizOption,
	params: { courseId, topicId },
	langCode,
	isLastSlide = false,
}) => {
	const [vote, setVote] = useState<number>(0)
	// const [audioState, setAudioState] = useState<number>(0)
	const [inViewAt, setInViewAt] = useState<number | null>(null)
	const { ref, inView } = useInView()
	const [answerState, setAnswerState] = useState<{
		id?: string
		body?: string
		isCorrect?: boolean
	}>()

	const getTextForSpeech = useCallback(() => {
		if (slide.type === "quiz") {
			const questionText = slide.question
			const answersText = slide.answers
				? slide.answers.map(a => a.body).join("\n")
				: ""
			return `${questionText}\n${answersText}`
		} else {
			return `${slide.title}\n${slide.body}`
		}
	}, [slide.answers, slide.body, slide.question, slide.title, slide.type])

	const { subscribe, handleAudio, unsubscribe, audioState } =
		useTextToSpeech()

	const resetVote = () => setVote(0)

	const handleFeedback = (feedback: number) => {
		// setSlideState(prev => ({
		// 	...prev,
		// 	finished: [...prev.finished, idx],
		// }))
		setVote(feedback)
		handleVote({
			meta: { courseId, topicId, id: slide.id as string, type: "slide" },
			resetVote,
			body: {
				langCode,
				feedback:
					feedback === 1 ? "like" : feedback === -1 ? "dislike" : "",
			},
		})
	}

	useEffect(() => {
		if (inView) subscribe(`${slide.title}\n${slide.body}`)
		else unsubscribe()

		return () => {
			unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView, slide.body, slide.title])

	useEffect(() => {
		if (inView && inViewAt === null) {
			setInViewAt(new Date().getTime())
			setSlideState(prev => ({
				...prev,
				current: idx,
			}))
		}
		if (!inView && inViewAt !== null) {
			const diff = Math.abs(new Date().getTime() - inViewAt)
			console.log(`${idx} stayed for ${diff / 1000}`)
			setInViewAt(null)
			setSlideState(prev => ({
				...prev,
				finished: [...prev.finished, idx],
			}))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idx, inView, inViewAt, setSlideState])

	return (
		<div
			id={`slide-${idx}`}
			className={cn(
				"relative flex h-full w-full snap-center snap-always flex-col justify-center overflow-hidden rounded-md bg-white shadow-md ring-1 ring-inset ring-neutral-200 scrollbar-hide dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-500/20"
			)}
		>
			<div className="flex flex-1 flex-col gap-4 overflow-hidden p-4 pb-0">
				{slide.type === "quiz" ? (
					<div className="flex w-full items-center justify-center text-xs text-purple-700 dark:text-purple-400">
						💡&nbsp;Lets see how much you remember
					</div>
				) : null}
				<span className="font-medium">
					{slide.title || slide.question}
				</span>
				{slide.answers &&
				slide.answers.length &&
				slide.type === "quiz" ? (
					<div className="flex h-full flex-col gap-2">
						{slide.answers.map((answer, i) => (
							<button
								disabled={!!slide.userAnswer || !!answerState}
								id={answer.body}
								key={answer.id ?? answer.body}
								onClick={() => {
									setAnswerState(answer)
									// if (answer.isCorrect) fire()
									handleQuizOption({
										answer,
										idx,
										answers: slide.answers,
									})
								}}
								className={cn(
									"flex w-full cursor-pointer items-center justify-between rounded-md border border-neutral-300 bg-white px-3 py-2 text-left text-xs font-medium text-gray-700 transition-all duration-500  disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200 ",
									slide.userAnswer ||
										answerState?.id === answer.id
										? answer.id === slide.correctAnswer
											? "border-green-300 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-800 dark:text-green-200"
											: slide.userAnswer === answer.id
												? "border-red-300 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-800 dark:text-red-200"
												: ""
										: ""
								)}
								// style={
								// 	slide.userAnswer
								// 		? answer.id === slide.correctAnswer
								// 			? { backgroundColor: "green" }
								// 			: slide.userAnswer === answer.id
								// 				? { backgroundColor: "red" }
								// 				: {}
								// 		: {}
								// }
							>
								<span>
									{Alphabets[i]}.&nbsp; {answer.body}
								</span>
								{slide.userAnswer || answerState ? (
									answer.id === slide.userAnswer ||
									answer.id === answerState?.id ? (
										answer.isCorrect ? (
											<CheckCircleIcon className="h-4 w-4 shrink-0 fill-green-500 dark:fill-green-200" />
										) : (
											<XCircleIcon className="h-4 w-4 shrink-0 fill-red-500 dark:fill-red-200" />
										)
									) : null
								) : null}
							</button>
						))}
						{slide.userAnswer || answerState ? (
							slide.userAnswer === slide.correctAnswer ||
							answerState?.isCorrect ? (
								<div className="mt-2 flex w-full items-center justify-center rounded-md bg-green-50 p-2 text-xs font-medium text-green-600 dark:bg-green-400/10 dark:text-green-200">
									🎊 Congratulations! Good Work! 🎊
								</div>
							) : (
								<div className="mt-2 flex w-full items-center justify-center rounded-md bg-red-50 p-2 text-xs font-medium text-red-600 dark:bg-red-400/10 dark:text-red-200">
									🎊 Uh Oh! But hope you got the right one 🎊
								</div>
							)
						) : null}
					</div>
				) : (
					<p className="h-full overflow-auto text-sm leading-7 text-gray-900 scrollbar dark:text-neutral-200">
						{slide.body}
					</p>
				)}
			</div>
			{slide.type === "text" ? (
				<div className="flex items-center justify-between p-4">
					<div className="flex gap-2">
						<Button
							variant={vote === 1 ? "outline" : "ghost"}
							size="icon"
							onClick={() => {
								handleFeedback(1)
							}}
							className={cn(
								vote === 1
									? "border-green-600/20 bg-green-600/10 dark:border-green-600/20 dark:bg-green-600/10"
									: ""
							)}
						>
							{vote === 1 ? (
								<HandThumbUpIconSolid className="h-4 w-4 fill-green-500" />
							) : (
								<HandThumbUpIconOutline className="h-4 w-4 opacity-70" />
							)}
						</Button>
						<Button
							variant={vote === -1 ? "outline" : "ghost"}
							size="icon"
							onClick={() => handleFeedback(-1)}
							className={cn(
								vote === -1
									? "border-red-600/20 bg-red-600/10 dark:border-red-600/20 dark:bg-red-600/10"
									: ""
							)}
						>
							{vote === -1 ? (
								<HandThumbDownIconSolid className="h-4 w-4 fill-red-500" />
							) : (
								<HandThumbDownIconOutline className="h-4 w-4 opacity-70" />
							)}
						</Button>
					</div>
					<Button
						variant={audioState === 1 ? "outline" : "ghost"}
						size="icon"
						className={cn(
							audioState === 1
								? "border-blue-600/20 bg-blue-600/10 dark:border-blue-600/20 dark:bg-blue-600/10"
								: ""
						)}
						onClick={handleAudio}
						disabled={langCode !== "en"}
					>
						{audioState === 1 ? (
							<SpeakerWaveIconSolid className="h-4 w-4 fill-blue-500" />
						) : (
							<SpeakerWaveIconOutline className="h-4 w-4 opacity-70" />
						)}
					</Button>
				</div>
			) : null}
			<span
				ref={ref}
				className="absolute inset-x-0 z-0 opacity-0"
			>
				slide
			</span>
		</div>
	)
}
