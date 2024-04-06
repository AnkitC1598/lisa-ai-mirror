"use client"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import cookieService from "@/services/cookie"
import useAIStore from "@/store"
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
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
