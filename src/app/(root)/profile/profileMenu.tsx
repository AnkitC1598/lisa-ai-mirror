"use client"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon, PencilIcon } from "@heroicons/react/16/solid"
import { useTheme } from "next-themes"
import Link from "next/link"

const ProfileMenu = () => {
	const { theme, setTheme } = useTheme()

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						size="icon"
						variant="outline"
					>
						<EllipsisVerticalIcon className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem
						checked={theme === "dark"}
						onCheckedChange={checked =>
							setTheme(checked ? "dark" : "light")
						}
					>
						Dark Mode
					</DropdownMenuCheckboxItem>
					<DropdownMenuItem asChild>
						<Link
							href="/profile/edit"
							className="flex items-center gap-2"
						>
							<PencilIcon className="h-4 w-4" />
							<span>Edit</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<div
							onClick={() => (window.location.href = "/auth")}
							className="flex items-center gap-2"
						>
							<PencilIcon className="h-4 w-4" />
							<span>Switch Org</span>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>Subscription</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export default ProfileMenu
