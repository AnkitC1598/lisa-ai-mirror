"use client"

import logo from "@/app/favicon.ico"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ClipboardDocumentIcon, SparklesIcon } from "@heroicons/react/16/solid"
import {
	HandThumbDownIcon as HandThumbDownIconOutline,
	HandThumbUpIcon as HandThumbUpIconOutline,
} from "@heroicons/react/24/outline"
import {
	HandThumbDownIcon as HandThumbDownIconSolid,
	HandThumbUpIcon as HandThumbUpIconSolid,
	SpeakerWaveIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react"

export const UserMessage = () => {
	return (
		<>
			<div className="flex flex-col gap-2 p-4 text-right">
				<div className="flex items-center justify-between text-sm text-gray-500">
					<span>1hr</span>
					<div className="flex items-center gap-1">
						<span>You</span>
						<div className="relative h-5 w-5 overflow-hidden rounded-full">
							<Image
								src={logo}
								alt="username"
								fill
							/>
						</div>
					</div>
				</div>
				<p>Message</p>
			</div>
		</>
	)
}

export const AiMessage = () => {
	const [vote, setVote] = useState<string | null>(null)
	const [copy, setCopy] = useState<string | null>(null)
	const [audioState, setAudioState] = useState<string | null>(null)

	const handleVote = (type: string) =>
		setVote(prev => (prev === type ? null : type))

	const handleAudio = () => {
		if (audioState !== null) return
		setAudioState("playing")
		setTimeout(() => setAudioState(null), 1000)
	}

	const handleCopy = () => {
		if (copy !== null) return
		setCopy("copying")
		setTimeout(() => setCopy(null), 1000)
	}

	return (
		<>
			<div className="flex flex-col gap-2 bg-[linear-gradient(180deg,_rgba(250,_231,_255,_0.9)_33.09%,_rgba(250,_231,_255,_0.46)_100%)] p-4 dark:bg-[linear-gradient(180deg,_rgb(202_0_255_/_10%)_33.09%,_rgb(202_0_255_/_8%)_100%)]">
				<div className="flex items-center justify-between text-sm text-gray-500">
					<div className="flex items-center gap-1">
						<div className="relative h-5 w-5 overflow-hidden rounded-full">
							<Image
								src={logo}
								alt="username"
								fill
							/>
						</div>
						<span className="inline-flex h-5 items-center gap-1 whitespace-nowrap rounded-md bg-purple-50 px-1.5 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
							<span>lisa AI</span>
							<SparklesIcon className="h-2 w-2" />
						</span>
					</div>
					<span>1hr</span>
				</div>
				<p className="text-sm">Message</p>
				<div className="flex items-center gap-2">
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
						onClick={handleCopy}
					>
						<ClipboardDocumentIcon
							className={cn(
								"h-4 w-4",
								copy === "copying" ? "fill-blue-500" : ""
							)}
						/>
					</Button>
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
			</div>
		</>
	)
}
