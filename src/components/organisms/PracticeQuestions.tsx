"use client"

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { handleAudio, handleVote } from "@/lib/interactions"
import { cn } from "@/lib/utils"
import { IPracticeQuestion } from "@/types/topic"
import {
	BookmarkIcon as BookmarkIconOutline,
	HandThumbDownIcon as HandThumbDownIconOutline,
	HandThumbUpIcon as HandThumbUpIconOutline,
} from "@heroicons/react/24/outline"
import {
	BookmarkIcon as BookmarkIconSolid,
	HandThumbDownIcon as HandThumbDownIconSolid,
	HandThumbUpIcon as HandThumbUpIconSolid,
	SpeakerWaveIcon,
} from "@heroicons/react/24/solid"
import { useParams } from "next/navigation"
import { useState } from "react"

interface IPracticeQuestions {
	questions: IPracticeQuestion[]
}

const PracticeQuestions: React.FC<IPracticeQuestions> = ({ questions }) => {
	const { courseId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	return (
		<>
			<div className="px-4">
				<Accordion
					type="single"
					collapsible
					className="space-y-4"
				>
					{questions.map((question, idx) => (
						<PracticeQuestion
							key={question.id ?? question.question}
							question={question}
							idx={idx + 1}
							params={{ courseId, topicId }}
						/>
					))}
				</Accordion>
			</div>
		</>
	)
}

export const PracticeQuestionsSkeletonLoader = () => {
	return (
		<div className="flex flex-1 p-2">
			<div className="flex h-full w-full p-2">
				<div className="flex w-full flex-shrink-0 flex-col gap-2 rounded-lg bg-neutral-200 p-4 dark:bg-neutral-800">
					<div className="h-[30px] w-auto rounded-md bg-neutral-300 text-transparent dark:bg-neutral-700 sm:w-[352px]"></div>
					<div className="h-[42px] w-auto rounded-md bg-neutral-300 text-transparent dark:bg-neutral-700 sm:w-[352px]"></div>
				</div>
			</div>
		</div>
	)
}

interface IPracticeQuestionProps {
	question: IPracticeQuestion
	idx: number
	params: { courseId: string; topicId: string }
}

export const PracticeQuestion: React.FC<IPracticeQuestionProps> = ({
	question,
	idx,
	params: { courseId, topicId },
}) => {
	const [vote, setVote] = useState<number>(0)
	const [audioState, setAudioState] = useState<number>(0)
	const [bookmarked, setBookmarked] = useState<boolean>(
		question.bookmarked ?? false
	)

	const resetVote = () => setVote(0)

	const handleFeedback = (feedback: number) => {
		setVote(feedback)
		handleVote({
			body: {
				feedback:
					feedback === 1 ? "like" : feedback === -1 ? "dislike" : "",
			},
			meta: {
				courseId,
				topicId,
				id: question.id as string,
				type: "question",
			},
			resetVote,
		})
	}

	const handleBookmark = () => setBookmarked(prev => !prev)

	return (
		<>
			<AccordionItem
				value={`${idx}`}
				className="rounded-md px-4 shadow ring-1 ring-inset ring-neutral-200 dark:shadow-neutral-800 dark:ring-neutral-800"
			>
				<AccordionTrigger>
					<div className="flex flex-col items-start justify-start gap-1 text-sm">
						<div>Question {String(idx).padStart(2, "0")}</div>
						<div className="text-left text-gray-500">
							{question.question}
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<span>Ans.</span>
					<span className="text-gray-500">{question.answer}</span>
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
							<Button
								variant={audioState === 1 ? "outline" : "ghost"}
								size="icon"
								className={cn(
									audioState === 1
										? "border-blue-600/20 bg-blue-600/10 dark:border-blue-600/20 dark:bg-blue-600/10"
										: ""
								)}
								onClick={() =>
									handleAudio({
										text:
											question.question +
											"\n" +
											question.answer,
										audioState,
										setAudioState,
									})
								}
							>
								<SpeakerWaveIcon
									className={cn(
										"h-4 w-4",
										audioState === 1 ? "fill-blue-500" : ""
									)}
								/>
							</Button>
						</div>
						<Button
							variant={bookmarked ? "outline" : "ghost"}
							size="icon"
							onClick={handleBookmark}
							className={cn(
								"relative",
								bookmarked
									? "border-yellow-500/20 bg-yellow-500/10 dark:border-yellow-500/20 dark:bg-yellow-500/10"
									: ""
							)}
						>
							{bookmarked ? (
								<BookmarkIconSolid className="h-4 w-4 shrink-0 fill-yellow-500" />
							) : (
								<BookmarkIconOutline className="h-4 w-4 shrink-0" />
							)}
						</Button>
					</div>
				</AccordionContent>
			</AccordionItem>
		</>
	)
}

export default PracticeQuestions
