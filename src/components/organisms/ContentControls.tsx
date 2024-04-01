"use client"

import { Button } from "@/components/ui/button"
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"
import { useState } from "react"
import LanguageSwitcher from "./LanguageSwitcher"

interface IContentControls {
	language: string
	setLanguage: React.Dispatch<React.SetStateAction<string>>
}

const ContentControls: React.FC<IContentControls> = ({
	language,
	setLanguage,
}) => {
	const [bookmarked, setBookmarked] = useState<boolean>(false)

	const handleBookmark = () => {
		setBookmarked(prev => !prev)
	}

	return (
		<div className="flex items-center justify-between px-4">
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
			{/* <Button
				variant="outline"
				size="icon"
				onClick={handleBookmark}
				className="relative"
			>
				<LanguageIcon className="h-4 w-4 shrink-0" />
			</Button> */}
			<LanguageSwitcher {...{ value: language, setValue: setLanguage }} />
		</div>
	)
}

export default ContentControls
