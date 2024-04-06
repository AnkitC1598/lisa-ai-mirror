"use client"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
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
					<DropdownMenuItem
						onClick={() =>
							setTheme(theme === "dark" ? "light" : "dark")
						}
					>
						{theme === "dark" ? "Light" : "Dark"} Mode
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link
							href="/profile/edit"
							className="flex items-center gap-2"
						>
							<span>Edit</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<div
							onClick={() => (window.location.href = "/auth")}
							className="flex items-center gap-2"
						>
							<span>Switch Org</span>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<div
							onClick={() => (window.location.href = "/auth")}
							className="flex items-center gap-2"
						>
							<span>Logout</span>
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export default ProfileMenu
