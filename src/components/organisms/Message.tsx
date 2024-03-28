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

export const UserMessage = ({ message = "" }) => {
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
				<p>{message}</p>
			</div>
		</>
	)
}

export const AiMessage = ({ message = "" }) => {
	const [vote, setVote] = useState<string | null>(null)
	const [copy, setCopy] = useState<string | null>(null)
	const [audioState, setAudioState] = useState<string | null>(null)

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
			console.error(`🚀 ~ handleAudio ~ e:`, e)
		}

		synth.speak(utterance)
		setAudioState("playing")
		// setTimeout(() => setAudioState(null), 1000)
		utterance.onend = () => setAudioState(null)
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
				<p className="text-sm">{message}</p>
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
						onClick={() => handleAudio(message)}
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

function removeEmojis(string: string) {
	var regex =
		/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
	return string.replace(regex, "")
}
