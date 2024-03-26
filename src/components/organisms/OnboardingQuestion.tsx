"use client"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

function randomString(length: number) {
	var result = ""
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	var charactersLength = characters.length
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		)
	}
	return result
}

interface IOnboardingQuestion {
	className?: string
}

const OnboardingQuestion: React.FC<IOnboardingQuestion> = ({
	className = "",
}) => {
	return (
		<>
			<div className="flex flex-col gap-4">
				<span className={cn("font-medium", className)}>
					Your favorite hobby is
				</span>
				<div className="flex flex-wrap gap-4">
					{Array.from({ length: 8 }).map((_, i) => (
						<Option
							key={i}
							selected={Boolean(i % 3)}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default OnboardingQuestion

interface IOption {
	selected?: boolean
}

export const Option: React.FC<IOption> = ({ selected = false }) => {
	let randomNum = Math.round(Math.random() * (10 - 4) + 4)
	return (
		<Button
			variant="outline"
			className={cn(
				"py-0-2 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-5 text-xs font-medium capitalize",
				selected
					? "border-purple-700 bg-purple-200 text-purple-700 hover:bg-purple-300 hover:text-purple-700 dark:border-purple-400/30 dark:bg-purple-400/10 dark:text-purple-400 dark:hover:bg-purple-400/20 dark:hover:text-purple-400"
					: ""
			)}
		>
			{randomString(randomNum)}
		</Button>
	)
}
