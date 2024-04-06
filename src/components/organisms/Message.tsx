"use client"

import logo from "@/app/favicon.ico"
import { Button } from "@/components/ui/button"
import { handleCopy, handleVote } from "@/lib/interactions"
import { cn } from "@/lib/utils"
import useAIStore from "@/store"
import { SparklesIcon } from "@heroicons/react/16/solid"
import {
	ClipboardDocumentIcon as ClipboardDocumentIconOutline,
	HandThumbDownIcon as HandThumbDownIconOutline,
	HandThumbUpIcon as HandThumbUpIconOutline,
} from "@heroicons/react/24/outline"
import {
	ClipboardDocumentIcon as ClipboardDocumentIconSolid,
	HandThumbDownIcon as HandThumbDownIconSolid,
	HandThumbUpIcon as HandThumbUpIconSolid,
} from "@heroicons/react/24/solid"
import { Message } from "ai/react"
import { formatDistance } from "date-fns"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"

interface IMessage {
	message: Message & {
		createdAt?: Date | string | number
	}
	params: { courseId: string; topicId: string }
	loader?: boolean
}

export const UserMessage: React.FC<IMessage> = ({ message }) => {
	const profileImage = useAIStore(store => store.user?.profileImage)
	return (
		<>
			<div className="flex flex-col gap-2 p-4 text-right text-sm">
				<div className="flex items-center justify-between text-gray-500">
					<span className="text-xs">
						{formatDistance(
							new Date(message.createdAt ?? new Date()),
							new Date()
						)}
					</span>
					<div className="flex items-center gap-2 text-xs">
						<span>You</span>
						<div className="relative h-5 w-5 overflow-hidden rounded-md">
							<Image
								src={profileImage ?? logo}
								alt="username"
								fill
							/>
						</div>
					</div>
				</div>
				<p>{message.content}</p>
			</div>
		</>
	)
}

export const AiMessage: React.FC<IMessage> = ({
	message,
	params: { courseId, topicId },
	loader = false,
}) => {
	const [vote, setVote] = useState<number>(0)
	const [copy, setCopy] = useState<number>(0)

	// const { subscribe, handleAudio, unsubscribe, audioState } =
	// 	useTextToSpeech()

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
				id: message.id as string,
				type: "chat",
			},
			resetVote,
		})
	}

	// useEffect(() => {
	// 	if (!message.content) return

	// 	subscribe(message.content)

	// 	return () => {
	// 		unsubscribe()
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [message.content, subscribe])

	return (
		<>
			<div className="flex flex-col gap-2 bg-[linear-gradient(180deg,_rgba(250,_231,_255,_0.9)_33.09%,_rgba(250,_231,_255,_0.46)_100%)] p-4 dark:bg-[linear-gradient(180deg,_rgb(202_0_255_/_10%)_33.09%,_rgb(202_0_255_/_8%)_100%)]">
				<div className="flex items-center justify-between text-sm text-gray-500">
					<div className="flex items-center gap-1">
						<div className="relative h-5 w-5 overflow-hidden rounded-md">
							<Image
								src={logo}
								alt="username"
								fill
							/>
						</div>
						<span className="inline-flex h-5 items-center gap-1 whitespace-nowrap rounded-md bg-purple-400/10 px-1.5 py-0.5 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-600/20">
							<span>lisa AI</span>
							<SparklesIcon className="h-2 w-2" />
						</span>
					</div>
					<span className="text-xs">
						{formatDistance(
							new Date(message.createdAt ?? new Date()),
							new Date()
						)}
					</span>
				</div>
				{loader ? (
					<p className="mt-1 flex flex-col gap-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-[75%]" />
					</p>
				) : (
					<p className="text-sm">{message.content}</p>
				)}
				<div className="flex items-center gap-2">
					<Button
						variant={vote === 1 ? "outline" : "ghost"}
						size="icon"
						onClick={() => {
							handleFeedback(1)
						}}
						disabled={loader}
						className={cn(
							vote === 1
								? "border-green-600/20 bg-green-600/10 dark:border-green-600/20 dark:bg-green-600/10"
								: ""
						)}
					>
						{vote === 1 ? (
							<HandThumbUpIconSolid className="h-4 w-4 fill-green-500" />
						) : (
							<HandThumbUpIconOutline className="h-4 w-4 opacity-70" />
						)}
					</Button>
					<Button
						variant={vote === -1 ? "outline" : "ghost"}
						size="icon"
						onClick={() => handleFeedback(-1)}
						disabled={loader}
						className={cn(
							vote === -1
								? "border-red-600/20 bg-red-600/10 dark:border-red-600/20 dark:bg-red-600/10"
								: ""
						)}
					>
						{vote === -1 ? (
							<HandThumbDownIconSolid className="h-4 w-4 fill-red-500" />
						) : (
							<HandThumbDownIconOutline className="h-4 w-4 opacity-70" />
						)}
					</Button>
					<Button
						variant={copy === 1 ? "outline" : "ghost"}
						size="icon"
						disabled={loader}
						className={cn(
							copy === 1
								? "border-blue-600/20 bg-blue-600/10 dark:border-blue-600/20 dark:bg-blue-600/10"
								: ""
						)}
						onClick={() =>
							handleCopy({ text: message.content, setCopy })
						}
					>
						{copy === 1 ? (
							<ClipboardDocumentIconSolid className="h-4 w-4 fill-blue-500" />
						) : (
							<ClipboardDocumentIconOutline className="h-4 w-4 opacity-70" />
						)}
					</Button>
					{/* <Button
						variant={audioState === 1 ? "outline" : "ghost"}
						size="icon"
						className={cn(
							audioState === 1
								? "border-blue-600/20 bg-blue-600/10 dark:border-blue-600/20 dark:bg-blue-600/10"
								: ""
						)}
						onClick={handleAudio}
					>
						<SpeakerWaveIcon
							className={cn(
								"h-4 w-4",
								audioState === 1 ? "fill-blue-500" : ""
							)}
						/>
					</Button> */}
				</div>
			</div>
		</>
	)
}
