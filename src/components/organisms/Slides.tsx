"use client"

import { answerQuiz } from "@/actions/hierarchy"
import useTextToSpeech from "@/hooks/useTextToSpeech"
import { handleVote } from "@/lib/interactions"
import { cn } from "@/lib/utils"
import { SetState } from "@/types"
import { IAnswer, ISlide } from "@/types/topic"
import {
	HandThumbDownIcon as HandThumbDownIconOutline,
	HandThumbUpIcon as HandThumbUpIconOutline,
} from "@heroicons/react/24/outline"
import {
	HandThumbDownIcon as HandThumbDownIconSolid,
	HandThumbUpIcon as HandThumbUpIconSolid,
	SpeakerWaveIcon,
} from "@heroicons/react/24/solid"
import { useParams } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "../ui/button"
import ContentPagination from "./ContentPagination"

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
				element.style.backgroundColor = "transparent"
				if ((answer.isCorrect && answer === ans) || ans.isCorrect)
					element.style.backgroundColor = "green"
				else if (!answer.isCorrect && answer === ans)
					element.style.backgroundColor = "red"
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
		<div className="flex h-[calc(100%-56px)] flex-1 p-2">
			<div className="flex h-full w-full p-2">
				<div className="flex w-full flex-shrink-0 flex-col rounded-lg bg-neutral-200 p-4 dark:bg-neutral-800">
					<div className="mb-1 w-fit rounded-md bg-neutral-300 text-sm text-transparent dark:bg-neutral-700">
						{"xxxxx"}
					</div>
					<div className="mb-1 w-fit rounded-md bg-neutral-300 text-transparent dark:bg-neutral-700">
						{"xxxxxxxxxxx"}
					</div>
					<div className="h-[42px] w-auto rounded-md bg-neutral-300 text-transparent dark:bg-neutral-700 sm:w-[352px]"></div>
				</div>
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
				"relative flex h-full w-full snap-center snap-always flex-col justify-center rounded-md px-4 shadow-md ring-1 ring-inset ring-neutral-200 scrollbar-hide dark:shadow-neutral-800 dark:ring-neutral-800",
				inView ? "py-4" : ""
			)}
		>
			<div className="flex flex-1 flex-col gap-2">
				<span className="font-semibold">
					{slide.title || slide.question}
				</span>
				{slide.answers &&
				slide.answers.length &&
				slide.type === "quiz" ? (
					<div className="flex h-full flex-col gap-2 py-4">
						{slide.answers.map(answer => (
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
									"w-full cursor-pointer rounded-md border border-neutral-200 bg-neutral-200 p-2 transition-all duration-500 hover:bg-neutral-300 disabled:cursor-not-allowed dark:border-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700",
									slide.userAnswer
										? answer.id === slide.correctAnswer
											? "bg-green-500"
											: slide.userAnswer === answer.id
												? "bg-red-500"
												: ""
										: ""
								)}
								style={
									slide.userAnswer
										? answer.id === slide.correctAnswer
											? { backgroundColor: "green" }
											: slide.userAnswer === answer.id
												? { backgroundColor: "red" }
												: {}
										: {}
								}
							>
								{answer.body}
							</button>
						))}
						{slide.type === "quiz" &&
						(slide.userAnswer || answerState) ? (
							<div className="flex w-full flex-1 items-center justify-center">
								{slide.userAnswer === slide.correctAnswer ||
								answerState?.isCorrect
									? "Congratulations"
									: "Sorry"}
							</div>
						) : null}
					</div>
				) : (
					<p className="leading-8">{slide.body}</p>
				)}
			</div>
			{slide.type === "text" ? (
				<div className="flex items-center justify-between">
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
								<HandThumbUpIconOutline className="h-4 w-4" />
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
								<HandThumbDownIconOutline className="h-4 w-4" />
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
						<SpeakerWaveIcon
							className={cn(
								"h-4 w-4",
								audioState === 1 ? "fill-blue-500" : ""
							)}
						/>
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
