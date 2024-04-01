"use client"

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
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
import { useState } from "react"

interface IPracticeQuestions {
	questions: IPracticeQuestion[]
}

const PracticeQuestions: React.FC<IPracticeQuestions> = ({ questions }) => {
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
							key={question.question}
							question={question}
							idx={idx + 1}
						/>
					))}
				</Accordion>
			</div>
		</>
	)
}

interface IPracticeQuestionProps {
	question: IPracticeQuestion
	idx: number
}

const PracticeQuestion: React.FC<IPracticeQuestionProps> = ({
	question,
	idx,
}) => {
	const [vote, setVote] = useState<string | null>(null)
	const [audioState, setAudioState] = useState<string | null>(null)
	const [bookmarked, setBookmarked] = useState<boolean>(false)

	const handleVote = (type: string) =>
		setVote(prev => (prev === type ? null : type))

	const handleAudio = () => {
		if (audioState !== null) return
		setAudioState("playing")
		setTimeout(() => setAudioState(null), 1000)
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
						<div className="flex gap-4">
							<Button
								variant="outline"
								size="icon"
								onClick={() => handleVote("up")}
							>
								{vote === "up" ? (
									<HandThumbUpIconSolid className="h-4 w-4 fill-green-500" />
								) : (
									<HandThumbUpIconOutline className="h-4 w-4" />
								)}
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={() => handleVote("down")}
							>
								{vote === "down" ? (
									<HandThumbDownIconSolid className="h-4 w-4 fill-red-500" />
								) : (
									<HandThumbDownIconOutline className="h-4 w-4" />
								)}
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={handleAudio}
							>
								<SpeakerWaveIcon
									className={cn(
										"h-4 w-4",
										audioState === "playing"
											? "fill-blue-500"
											: ""
									)}
								/>
							</Button>
						</div>
						<Button
							variant="outline"
							size="icon"
							onClick={handleBookmark}
							className="relative"
						>
							{bookmarked ? (
								<BookmarkIconSolid className="h-4 w-4 shrink-0" />
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
