import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"
import FormatText from "./FormatText"

const ReadMore = ({
	label = "Read",
	text = "",
	color = "text-purple-500",
	minLength = 300,
	...props
}) => {
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleExpansion = () => {
		setIsExpanded(!isExpanded)
	}

	const displayText = useMemo(() => {
		if (isExpanded) {
			return text
		} else if (text?.length < minLength) {
			return text
		} else {
			return `${text?.slice(0, minLength)}...`
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text, minLength, isExpanded])

	return (
		<>
			<FormatText
				text={displayText}
				{...props}
			/>
			{text?.length > minLength && (
				<span
					className={
						`${cn(
							"cursor-pointer underline-offset-2 hover:underline ",
							color
						)}` + " text-xxs"
					}
					onClick={toggleExpansion}
				>
					{isExpanded ? `${label} Less` : `${label} More`}
				</span>
			)}
		</>
	)
}

export default ReadMore
