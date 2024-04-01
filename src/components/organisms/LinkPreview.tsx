"use client"

import { Resource } from "@/types/topic"
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react"
import { Button } from "../ui/button"

type TOrientation = "landscape" | "portrait"

interface ILinkPreview {
	orientation?: TOrientation
	resource: Resource
}

const LinkPreview: React.FC<ILinkPreview> = ({
	orientation = "portrait",
	resource,
}) => {
	const [bookMarked, setBookMarked] = useState<boolean>(false)

	const handleBookmark = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()
		e.preventDefault()
		setBookMarked(prev => !prev)
	}
	return (
		<>
			<a
				href={resource.url}
				target="_blank"
				rel="noopener noreferrer"
				className="group/resource flex w-full gap-4 rounded-md bg-neutral-50 px-4 py-5 shadow-md ring-1  ring-inset ring-neutral-200 dark:bg-neutral-900 dark:shadow-neutral-800 dark:ring-neutral-800"
			>
				<div className="flex w-full flex-1 flex-col gap-3">
					<div className="flex flex-1 flex-col">
						<span className="line-clamp-2 pr-7 text-lg underline-offset-2 group-hover/resource:underline">
							{resource.title}
						</span>
						<span
							className="line-clamp-2 text-sm text-gray-500 dark:[&_strong]:font-normal"
							dangerouslySetInnerHTML={{
								__html: resource.description,
							}}
						/>
					</div>
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="relative flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-50">
								<div className="relative h-[20px] w-[20px] rounded">
									<Image
										src={resource.profile.img}
										alt={resource.profile.name}
										fill
										objectFit="contain"
										className="rounded"
									/>
								</div>
							</div>
							<div className="flex flex-col gap-0.5">
								<p className="line-clamp-1 text-xs font-bold text-gray-500">
									{resource.profile.name}
								</p>
								<p className="line-clamp-1 text-xs text-gray-500">
									{resource.meta_url.netloc}{" "}
									{resource.meta_url.path}
								</p>
							</div>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleBookmark}
							className="relative shrink-0"
						>
							{bookMarked ? (
								<BookmarkIconSolid className="h-4 w-4 shrink-0 dark:fill-yellow-400" />
							) : (
								<BookmarkIconOutline className="h-4 w-4 shrink-0" />
							)}
						</Button>
					</div>
				</div>
			</a>
		</>
	)
}

export default LinkPreview
