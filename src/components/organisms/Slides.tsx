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

const Slides = () => {
	return (
		<div className="flex h-[calc(100%-56px)] flex-1">
			<ContentPagination vertical />
			<div className="flex-1 snap-y snap-mandatory space-y-4 overflow-y-auto pb-4 pl-1 pr-4 scrollbar-hide">
				{Array.from({ length: 7 }, (_, i) => (
					<Slide
						key={i}
						idx={i}
					/>
				))}
			</div>
		</div>
	)
}

export default Slides

interface ISlide {
	idx: number
}

const Slide: React.FC<ISlide> = ({ idx }) => {
	const [vote, setVote] = useState<string | null>(null)
	const [audioState, setAudioState] = useState<string | null>(null)
	const [inViewAt, setInViewAt] = useState<number | null>(null)
	const { ref, inView } = useInView()

	const handleVote = (type: string) =>
		setVote(prev => (prev === type ? null : type))

	const handleAudio = () => {
		if (audioState !== null) return
		setAudioState("playing")
		setTimeout(() => setAudioState(null), 1000)
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
			<span className="flex flex-1 flex-col gap-2">
				<span className="font-semibold">Slide {idx}</span>
				<p className="leading-8">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Ullam aut eius, impedit nisi autem quae vitae optio
					perspiciatis fugiat est vel distinctio, recusandae incidunt
					assumenda. Placeat magni incidunt natus animi.
				</p>
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
				</div>
				<Button
					variant="outline"
					size="icon"
					onClick={handleAudio}
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
