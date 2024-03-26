"use client"

import logo from "@/app/favicon.ico"
import { cn } from "@/lib/utils"
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react"
import { Button } from "../ui/button"

type TOrientation = "landscape" | "portrait"

interface ILinkPreview {
	orientation?: TOrientation
}

const LinkPreview: React.FC<ILinkPreview> = ({ orientation = "landscape" }) => {
	const [bookmarked, setBookmarked] = useState<boolean>(false)

	const handleBookmark = () => {
		setBookmarked(prev => !prev)
	}
	return (
		<>
			<div
				className={cn(
					"flex gap-4 rounded-md shadow-md ring-1 ring-inset ring-neutral-200 dark:shadow-neutral-800 dark:ring-neutral-800",
					orientation === "landscape"
						? "h-32 w-full p-4"
						: "flex-1 flex-col"
				)}
			>
				<div
					className={cn(
						"relative rounded-md",
						orientation === "landscape"
							? "aspect-square h-full"
							: "aspect-video w-full"
					)}
				>
					<Image
						src={logo}
						alt="image"
						fill
						objectFit="contain"
					/>
				</div>
				<div
					className={cn(
						"flex flex-1 flex-col gap-2",
						orientation === "landscape" ? "" : "px-4 py-2"
					)}
				>
					<div className="flex flex-col gap-1">
						<span className="text-xs">Title</span>
						<span className="line-clamp-2 text-xs text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quidem ipsum, placeat animi pariatur magnam
							labore, quibusdam quasi minus impedit debitis
							voluptatum expedita enim nulla id? Doloribus
							nesciunt quasi impedit aspernatur?
						</span>
					</div>
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<div className="relative h-4 w-4 shrink-0 rounded-md ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800">
								<Image
									src={logo}
									alt="icon"
									fill
								/>
							</div>
							<p className="line-clamp-1 text-xs">Site</p>
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
				</div>
			</div>
		</>
	)
}

export default LinkPreview
