"use client"

import {
	addQuestionBookmark,
	removeQuestionBookmark,
} from "@/actions/bookmarks"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import HierarchyConstants from "@/constants/Hierarchy"
import HierarchyTypes from "@/constants/HierarchyTypes"
import useTextToSpeech from "@/hooks/useTextToSpeech"
import { handleVote } from "@/lib/interactions"
import { cn } from "@/lib/utils"
import { IPracticeQuestion } from "@/types/topic"
import {
	BookmarkIcon as BookmarkIconOutline,
	SpeakerWaveIcon as SpeakerWaveIconOutline,
} from "@heroicons/react/24/outline"
import {
	BookmarkIcon as BookmarkIconSolid,
	SpeakerWaveIcon as SpeakerWaveIconSolid,
} from "@heroicons/react/24/solid"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import FormatText from "../atoms/FormatText"
import { Skeleton } from "../ui/skeleton"
import HierarchyPeek from "./HierarchyPeek"

interface IPracticeQuestions {
	questions: IPracticeQuestion[]
}

const PracticeQuestions: React.FC<IPracticeQuestions> = ({ questions }) => {
	const [open, setOpen] = useState<string>("1")

	return (
		<>
			<div className="px-4 pb-4">
				<Accordion
					type="single"
					collapsible
					className="space-y-4"
					defaultValue="1"
					onValueChange={setOpen}
				>
					{questions.map((question, idx) => (
						<PracticeQuestion
							key={question.id ?? question.question}
							question={question}
							idx={idx + 1}
							open={open}
						/>
					))}
				</Accordion>
			</div>
		</>
	)
}

export const PracticeQuestionsSkeletonLoader = () => {
	return (
		<div className="flex w-full flex-col gap-2 p-4">
			{Array.from({ length: 4 }).map((_, i) => (
				<div
					key={i}
					className={cn(
						"relative flex h-full w-full flex-col items-start gap-2 overflow-hidden rounded-md bg-white p-4 shadow-md ring-1 ring-inset ring-neutral-200 scrollbar-hide dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-500/20"
					)}
				>
					<Skeleton className="h-5 w-full" />
					<Skeleton className="h-5 w-[75%]" />
				</div>
			))}
		</div>
	)
}

interface IPracticeQuestionProps {
	question: IPracticeQuestion & {
		[key: string]: any
	}
	idx: number
	open?: string
	peekIndex?: number
	showHierarchy?: boolean
}

export const PracticeQuestion: React.FC<IPracticeQuestionProps> = ({
	question,
	idx,
	open,
	peekIndex = 0,
	showHierarchy = false,
}) => {
	const [vote, setVote] = useState<number>(0)
	const [bookmarked, setBookmarked] = useState<boolean>(
		question.bookmarked ?? false
	)
	const { courseId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()

	const { subscribe, handleAudio, unsubscribe, audioState } =
		useTextToSpeech()

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

	const handleBookmark = () => {
		setBookmarked(prev => !prev)
		if (bookmarked) {
			removeQuestionBookmark({
				cohortId: courseId,
				topicId,
				questionId: question.id as string,
			}).then(code => {
				if (code === 200) setBookmarked(false)
			})
		} else {
			addQuestionBookmark({
				cohortId: courseId,
				topicId,
				body: question,
			}).then(code => {
				if (code === 200) setBookmarked(true)
			})
		}
	}
	useEffect(() => {
		if (!question.question || !question.answer || !open) return

		if (open === `${idx}`)
			subscribe(`${question.question}\n${question.answer}`)
		else unsubscribe()

		return () => {
			unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [question.question, question.answer, subscribe, open])

	const peekValue = useMemo(() => {
		if (!showHierarchy || !question.cohort)
			return {
				icon: "",
				breadcrumbs: [],
			}

		const currentHierarchy = question.cohort.type
			.map((t: string) => t[0])
			.join("")

		if (!currentHierarchy)
			return {
				icon: "",
				breadcrumbs: [],
			}
		const hierarchyArr = HierarchyTypes[currentHierarchy].slice(-2)
		let route: {
			icon: string | null
			breadcrumbs: {
				color: { border: string; bg: string }
				title: string
				_id: string
			}[]
		} = { icon: question.cohort.icon, breadcrumbs: [] }

		hierarchyArr.forEach((h, i) => {
			const hierarchyKey = h === "course" ? "cohort" : h
			const {
				colors: { peek: color },
			} = HierarchyConstants[hierarchyKey]
			route.breadcrumbs.push({
				color,
				title: question[hierarchyKey].title,
				_id: question[hierarchyKey]._id,
			})
		})

		return route
	}, [question, showHierarchy])

	return (
		<>
			<AccordionItem
				value={`${idx}`}
				className={cn("relative w-full", {
					"mt-6": showHierarchy,
				})}
				style={{ zIndex: peekIndex + 10 }}
			>
				{showHierarchy ? (
					<HierarchyPeek
						peekIndex={peekIndex}
						peekValue={peekValue}
					/>
				) : null}
				<div
					className="relative select-none rounded-md bg-neutral-50 px-4 shadow ring-1 ring-inset ring-neutral-200 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-500/20"
					style={{ zIndex: peekIndex + 20 }}
				>
					<AccordionTrigger>
						<div className="text-left text-sm">
							<FormatText text={question.question} />
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<span>Ans.</span>
						<span className="text-gray-500">{question.answer}</span>
						<div className="flex items-center justify-between">
							<div className="flex gap-2">
								{/* <Button
								variant={vote === 1 ? "outline" : "outline"}
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
								variant={vote === -1 ? "outline" : "outline"}
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
							</Button> */}
								<Button
									variant="outline"
									size="icon"
									className={cn(
										audioState === 1
											? "border-blue-600/20 bg-blue-600/10 dark:border-blue-600/20 dark:bg-blue-600/10"
											: ""
									)}
									onClick={handleAudio}
								>
									{audioState === 1 ? (
										<SpeakerWaveIconSolid className="h-4 w-4 fill-blue-500" />
									) : (
										<SpeakerWaveIconOutline className="h-4 w-4 opacity-70" />
									)}
								</Button>
							</div>
							<Button
								variant="outline"
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
									<BookmarkIconSolid className="h-4 w-4 shrink-0 fill-yellow-500 dark:fill-yellow-400" />
								) : (
									<BookmarkIconOutline className="h-4 w-4 shrink-0 opacity-70" />
								)}
							</Button>
						</div>
					</AccordionContent>
				</div>
			</AccordionItem>
		</>
	)
}

export default PracticeQuestions
