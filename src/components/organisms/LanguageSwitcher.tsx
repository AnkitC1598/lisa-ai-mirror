"use client"

import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CheckIcon, LanguageIcon } from "@heroicons/react/16/solid"
import { useState } from "react"

const Languages = [
	{ label: "English", value: "en" },
	{ label: "Hindi", value: "hi" },
	{ label: "Marathi", value: "mr" },
	{ label: "Gujarati", value: "gu" },
	{ label: "Telugu", value: "te" },
	{ label: "Malayalam", value: "ml" },
	{ label: "Bengali", value: "bn" },
	{ label: "Tamil", value: "ta" },
	{ label: "Punjabi", value: "pa" },
	{ label: "Odia", value: "or" },
	{ label: "Assamese", value: "as" },
	{ label: "Manipuri", value: "mn" },
	{ label: "Chinese", value: "zh" },
	{ label: "Spanish", value: "es" },
	{ label: "French", value: "fr" },
	{ label: "Arabic", value: "ar" },
	{ label: "Russian", value: "ru" },
	{ label: "German", value: "de" },
	{ label: "Japanese", value: "ja" },
] as const

interface ILanguageSwitcher {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const LanguageSwitcher: React.FC<ILanguageSwitcher> = ({ value, setValue }) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative"
				>
					<LanguageIcon className="h-4 w-4 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				side="bottom"
				align="end"
				className="w-[200px] p-0"
			>
				<Command>
					<CommandInput placeholder="Search language..." />
					<CommandList>
						<CommandEmpty>No language found.</CommandEmpty>
						<CommandGroup>
							{Languages.map(language => (
								<CommandItem
									key={language.value}
									value={language.value}
									onSelect={currentValue => {
										setValue(currentValue)
										setOpen(false)
									}}
								>
									<CheckIcon
										className={cn(
											"mr-2 h-4 w-4",
											language.value === value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{language.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default LanguageSwitcher
