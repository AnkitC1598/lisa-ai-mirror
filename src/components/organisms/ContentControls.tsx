"use client"

import { addTopicBookmark, removeTopicBookmark } from "@/actions/bookmarks"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"
import { useParams } from "next/navigation"
import { useState } from "react"
import LanguageSwitcher from "./LanguageSwitcher"

interface IContentControls {
	language: string
	setLanguage: React.Dispatch<React.SetStateAction<string>>
	bookmarkState?: boolean
	langDisabled?: boolean
}

const ContentControls: React.FC<IContentControls> = ({
	language,
	setLanguage,
	bookmarkState = false,
	langDisabled = false,
}) => {
	const { courseId: cohortId, topicId } = useParams<{
		courseId: string
		topicId: string
	}>()
	const [bookmarked, setBookmarked] = useState<boolean>(bookmarkState)

	const handleBookmark = () => {
		setBookmarked(prev => !prev)
		if (bookmarked) {
			removeTopicBookmark({ cohortId, topicId }).then(code => {
				if (code === 200) setBookmarked(false)
			})
		} else {
			addTopicBookmark({ cohortId, topicId }).then(code => {
				if (code === 200) setBookmarked(true)
			})
		}
	}

	return (
		<div className="flex items-center justify-between px-4">
			<Button
				variant="outline"
				size="icon"
				onClick={handleBookmark}
				className={cn(
					bookmarked
						? "relative border-yellow-600/20 bg-yellow-600/10 dark:border-yellow-600/20 dark:bg-yellow-600/10"
						: ""
				)}
			>
				{bookmarked ? (
					<BookmarkIconSolid className="h-4 w-4 fill-yellow-500" />
				) : (
					<BookmarkIconOutline className="h-4 w-4 opacity-70" />
				)}
			</Button>
			<LanguageSwitcher
				{...{
					value: language,
					setValue: setLanguage,
					disabled: langDisabled,
				}}
			/>
		</div>
	)
}

export default ContentControls
