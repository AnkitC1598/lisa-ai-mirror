"use client"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import cookieService from "@/services/cookie"
import useAIStore from "@/store"
import {
	EllipsisVerticalIcon,
	PencilSquareIcon,
} from "@heroicons/react/16/solid"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePostHog } from "posthog-js/react"

const ProfileMenu = () => {
	const { theme, setTheme } = useTheme()
	const dispatch = useAIStore(store => store.dispatch)
	const posthog = usePostHog()

	const logout = () => {
		cookieService.removeTokens()
		posthog.capture("user_logged_out")
		dispatch({
			type: "SET_STATE",
			payload: { user: null },
		})
		posthog.reset()
		window.location.href = "/auth"
	}

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
						className="px-4"
						asChild
					>
						<Link
							href="/profile/edit"
							className="flex items-center gap-2 px-4"
						>
							<PencilSquareIcon className="h-4 w-4" />
							<span>Edit Profile</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="px-4"
						onClick={() =>
							setTheme(theme === "dark" ? "light" : "dark")
						}
					>
						{theme === "dark" ? "Disable" : "Enable"} Dark Mode
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="px-4"
						asChild
					>
						<div
							onClick={() => (window.location.href = "/auth")}
							className="flex items-center gap-2"
						>
							<span>Switch organisation</span>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="px-4"
						asChild
					>
						<div
							onClick={logout}
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
