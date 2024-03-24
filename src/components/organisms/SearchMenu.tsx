"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/button"
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "../ui/command"

interface ISearchMenu {
	size?: string
	hideOnHome?: boolean
}

const SearchMenu: React.FC<ISearchMenu> = ({
	size = "small",
	hideOnHome = false,
}) => {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()

	if (hideOnHome && pathname === "/" && size === "small") return null

	return (
		<>
			<Button
				variant={
					size === "small"
						? "ghost"
						: size === "large"
							? "outline"
							: null
				}
				size={size === "small" ? "icon" : "default"}
				onClick={() => setOpen(true)}
				className={size === "large" ? "w-full justify-start gap-2" : ""}
			>
				<MagnifyingGlassIcon
					className={
						size === "large"
							? "h-5 w-5 shrink-0 opacity-50"
							: "h-6 w-6"
					}
				/>
				{size === "large" ? (
					<span className="text-gray-400">
						Search any topic from your curriculum
					</span>
				) : null}
			</Button>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
			>
				<CommandInput placeholder="Search any topic from your curriculum" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<span>Calendar</span>
						</CommandItem>
						<CommandItem onSelect={console.log}>
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem disabled>
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<span>Profile</span>
						</CommandItem>
						<CommandItem>
							<span>Billing</span>
						</CommandItem>
						<CommandItem>
							<span>Settings</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	)
}

export default SearchMenu
