"use client"

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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

interface IPracticeQuestion {
	idx: number
}
const PracticeQuestion: React.FC<IPracticeQuestion> = ({ idx }) => {
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
					<div className="flex flex-col items-start gap-1 text-sm">
						<span>Question {String(idx).padStart(2, "0")}</span>
						<span className="text-gray-500">Question {idx}</span>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<span>Ans.</span>
					<span className="text-gray-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Aspernatur esse iste suscipit libero beatae delectus
						repellendus a minima sapiente nam, voluptatum sequi
						nobis, error repellat aperiam, debitis reiciendis quidem
						neque.
					</span>
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

export default PracticeQuestion
