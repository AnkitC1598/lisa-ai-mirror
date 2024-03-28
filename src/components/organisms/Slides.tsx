"use client"

import { cn } from "@/lib/utils"
import {
	HandThumbDownIcon as HandThumbDownIconOutline,
	HandThumbUpIcon as HandThumbUpIconOutline,
} from "@heroicons/react/24/outline"
import {
	HandThumbDownIcon as HandThumbDownIconSolid,
	HandThumbUpIcon as HandThumbUpIconSolid,
	SpeakerWaveIcon,
} from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "../ui/button"
import ContentPagination from "./ContentPagination"

const Slides = ({ slides = [], quiz = [] }) => {
	const finalMergedArray = [...slides, ...quiz]
	return (
		<div className="flex h-[calc(100%-56px)] flex-1">
			<ContentPagination vertical />
			<div className="flex-1 snap-y snap-mandatory space-y-4 overflow-y-auto pb-4 pl-1 pr-4 scrollbar-hide">
				{finalMergedArray.map(
					(
						{
							title = "",
							body = "",
							question = "",
							options = [],
							priority = 0,
						},
						idx
					) => (
						<Slide
							key={title}
							idx={idx}
							title={title}
							body={body}
							question={question}
							options={options}
							priority={priority}
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

interface ISlide {
	idx: number
	title?: string
	body?: string
	question?: string
	options?: any[]
	priority: number
}

const Slide: React.FC<ISlide> = ({
	idx = 0,
	title = "",
	body = "",
	question = "",
	options = [],
}) => {
	const [vote, setVote] = useState<string | null>(null)
	const [audioState, setAudioState] = useState<string | null>(null)
	const [inViewAt, setInViewAt] = useState<number | null>(null)
	const { ref, inView } = useInView()

	const handleVote = (type: string) =>
		setVote(prev => (prev === type ? null : type))

	const handleAudio = (text = "") => {
		if (audioState !== null) return
		const synth = window.speechSynthesis
		const voices = synth.getVoices()
		const utterance = new SpeechSynthesisUtterance(removeEmojis(text))
		try {
			// @ts-ignore
			utterance.voice = voices.find(voice => voice.lang === "en-IN")
		} catch (e) {
			utterance.voice = voices[0]
		}

		synth.speak(utterance)
		setAudioState("playing")
		// setTimeout(() => setAudioState(null), 1000)
		utterance.onend = () => setAudioState(null)
	}

	useEffect(() => {
		if (inView && inViewAt === null) setInViewAt(new Date().getTime())
		if (!inView && inViewAt !== null) {
			const diff = Math.abs(new Date().getTime() - inViewAt)
			console.log(`${idx} stayed for ${diff / 1000}`)
			setInViewAt(null)
		}
	}, [idx, inView, inViewAt])

	return (
		<div
			className={cn(
				"relative flex h-full w-full snap-center snap-always flex-col justify-center rounded-md px-4 shadow-md ring-1 ring-inset ring-neutral-200 scrollbar-hide dark:shadow-neutral-800 dark:ring-neutral-800",
				inView ? "py-4" : ""
			)}
		>
			<div className="flex flex-1 flex-col gap-2">
				<span className="font-semibold">{title || question}</span>
				{options.length ? (
					<div className="flex flex-col gap-2 py-4">
						{options.map(option => (
							<span
								key={option.option}
								className={cn(
									"w-full cursor-pointer rounded-md border border-neutral-200 bg-neutral-200 p-2 hover:bg-neutral-300 dark:border-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700",
									option.isCorrect ? "text-green-500" : ""
								)}
							>
								{option.option}
							</span>
						))}
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
				</div>
				<Button
					variant="outline"
					size="icon"
					disabled={audioState === "playing"}
					onClick={() => handleAudio(title + "\n" + body)}
				>
					<SpeakerWaveIcon
						className={cn(
							"h-4 w-4",
							audioState === "playing" ? "fill-blue-500" : ""
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

function removeEmojis(string: string) {
	var regex =
		/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
	return string.replace(regex, "")
}
