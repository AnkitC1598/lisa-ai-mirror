"use client"

import { answerQuiz } from "@/actions/hierarchy"
import { handleAudio, handleVote } from "@/lib/interactions"
import { cn } from "@/lib/utils"
import { ISlide } from "@/types/topic"
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
import React, { SetStateAction, useEffect, useState } from "react"
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

	const handleQuizOption = (answer: any, idx: number, answers: []) => {
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

	// @ts-ignore
	const handleFeedback = (idx, slideId, feedback, vote, setVote) => {
		setSlideState(prev => ({
			...prev,
			finished: [...prev.finished, idx],
		}))
		handleVote({
			type: "slide",
			courseId: courseId,
			topicId,
			id: slideId,
			vote,
			setVote,
			body: {
				langCode: slides.language,
				feedback: feedback,
			},
		})
	}

	return (
		<div className="flex h-[calc(100%-56px)] flex-1">
			<ContentPagination
				vertical
				slideState={slideState}
				total={slides.slides.length}
			/>
			<div className="flex-1 snap-y snap-mandatory space-y-4 overflow-y-auto pb-4 pl-1 pr-4 scrollbar-hide">
				{slides.slides.map(
					(
						{
							id,
							title,
							body,
							question,
							answers,
							priority,
							type,
							userAnswer,
							correctAnswer,
						},
						idx
					) => (
						<Slide
							id={id}
							key={id}
							idx={idx}
							title={title}
							body={body}
							question={question}
							answers={answers}
							priority={priority}
							type={type}
							userAnswer={userAnswer}
							setSlideState={setSlideState}
							// @ts-ignore
							handleQuizOption={handleQuizOption}
							correctAnswer={correctAnswer}
							handleFeedback={handleFeedback}
						/>
					)
				)}
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
	id?: string
	idx?: number
	title?: string
	body?: string
	question?: string
	answers?: any[]
	priority: number
	type: string
	setSlideState: React.Dispatch<SetStateAction<ISlideState>>
	handleQuizOption: (answer: any, idx: number, answers: any[]) => void
	userAnswer?: string | null
	correctAnswer?: string | null
	handleFeedback?: (
		idx: number,
		slideId: string,
		feedback: string,
		vote: string,
		setVote: React.Dispatch<SetStateAction<string | null>>
	) => void
}

const Slide: React.FC<ISlideProps> = ({
	id = "",
	idx = 0,
	title = "",
	body = "",
	question = "",
	answers = [],
	priority = 0,
	type = "text",
	setSlideState,
	handleQuizOption,
	handleFeedback,
	userAnswer = null,
	correctAnswer = null,
}) => {
	const [vote, setVote] = useState<string | null>(null)
	const [audioState, setAudioState] = useState<string | null>(null)
	const [inViewAt, setInViewAt] = useState<number | null>(null)
	const { ref, inView } = useInView()

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
				<span className="font-semibold">{title || question}</span>
				{answers.length && type === "quiz" ? (
					<div className="flex h-full flex-col gap-2 py-4">
						{answers.map(answer => (
							<button
								disabled={!!userAnswer}
								id={answer.body}
								key={answer.id ?? answer.body}
								onClick={() =>
									handleQuizOption(answer, idx, answers)
								}
								className={cn(
									"w-full cursor-pointer rounded-md border border-neutral-200 bg-neutral-200 p-2 transition-all duration-500 hover:bg-neutral-300 disabled:cursor-not-allowed dark:border-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
									// userAnswer
									// 	? answer.id === correctAnswer
									// 		? "bg-green-500"
									// 		: userAnswer === answer.id
									// 			? "bg-red-500"
									// 			: ""
									// 	: ""
								)}
								style={
									userAnswer
										? answer.id === correctAnswer
											? { backgroundColor: "green" }
											: userAnswer === answer.id
												? { backgroundColor: "red" }
												: {}
										: {}
								}
							>
								{answer.body}
							</button>
						))}
						{type === "quiz" && userAnswer ? (
							<div className="flex w-full flex-1 items-center justify-center">
								{userAnswer === correctAnswer
									? "Congratulations"
									: "Sorry"}
							</div>
						) : null}
					</div>
				) : (
					<p className="leading-8">{body}</p>
				)}
			</div>
			<div className="flex items-center justify-between">
				<div className="flex gap-4">
					<Button
						variant="outline"
						size="icon"
						onClick={() => {
							// @ts-ignore
							handleFeedback(idx, id, "like", vote, setVote)
						}}
					>
						{vote === "like" ? (
							<HandThumbUpIconSolid className="h-4 w-4 fill-green-500" />
						) : (
							<HandThumbUpIconOutline className="h-4 w-4" />
						)}
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() =>
							// @ts-ignore
							handleFeedback(idx, id, "dislike", vote, setVote)
						}
					>
						{vote === "dislike" ? (
							<HandThumbDownIconSolid className="h-4 w-4 fill-red-500" />
						) : (
							<HandThumbDownIconOutline className="h-4 w-4" />
						)}
					</Button>
				</div>
				<Button
					variant="outline"
					size="icon"
					onClick={() =>
						handleAudio(
							type === "quiz"
								? question +
										"\n" +
										answers.map(a => a.body).join("\n")
								: title + "\n" + body,
							audioState,
							setAudioState
						)
					}
				>
					<SpeakerWaveIcon
						className={cn(
							"h-4 w-4",
							audioState === "playing" || audioState === "paused"
								? "fill-blue-500"
								: ""
						)}
					/>
				</Button>
			</div>
			<span
				ref={ref}
				className="absolute inset-x-0 z-0 opacity-0"
			>
				slide
			</span>
		</div>
	)
}
