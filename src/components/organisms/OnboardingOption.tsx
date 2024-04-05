"use client"

import { cn } from "@/lib/utils"
import { InterestCategory } from "@/types/preferences"
import { Button } from "../ui/button"

interface IOnboardingOption {
	option: InterestCategory
	onChange?: (...event: any[]) => void
	value: string | string[]
	single?: boolean
	disabled?: boolean
}

const OnboardingOption: React.FC<IOnboardingOption> = ({
	option,
	onChange,
	value,
	single = false,
	disabled = false,
}) => {
	const checked = single
		? option.value === value
		: Array.isArray(value) && value.includes(option.value)

	return (
		<Button
			type="button"
			variant="outline"
			className={cn(
				"inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 text-xs font-medium capitalize enabled:hover:border-purple-900/10 enabled:hover:bg-purple-100 enabled:hover:text-purple-900 disabled:opacity-100 enabled:hover:dark:border-purple-600/20 dark:enabled:hover:bg-purple-300/10 dark:enabled:hover:text-purple-400",
				checked
					? "border-purple-900/40 bg-purple-200/40 text-purple-900 dark:border-purple-600/20 dark:bg-purple-400/10 dark:text-purple-400"
					: "border-neutral-300 bg-neutral-200/40 text-gray-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-200"
			)}
			disabled={disabled}
			onClick={() => {
				if (
					onChange &&
					Object.prototype.toString.call(onChange) ===
						"[object Function]"
				)
					onChange(
						single
							? option.value
							: Array.isArray(value)
								? value.includes(option.value)
									? value.filter(val => val !== option.value)
									: [...value, option.value]
								: [value, option.value]
					)
			}}
		>
			{option.icon ? <span>{option.icon}</span> : null}
			{option.label}
		</Button>
	)
}

export default OnboardingOption
