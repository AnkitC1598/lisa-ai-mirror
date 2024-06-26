"use client"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import cookieService from "@/services/cookie"
import useAIStore from "@/store"
import {
	EllipsisVerticalIcon,
	PencilSquareIcon,
} from "@heroicons/react/16/solid"
import { DesktopIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePostHog } from "posthog-js/react"

const ProfileMenu = () => {
	const { theme, setTheme } = useTheme()
	const dispatch = useAIStore(store => store.dispatch)

	const posthog = usePostHog()

	const handleThemeChange = (selectedTheme: string) => (checked: boolean) => {
		if (checked) {
			posthog.capture("app_theme_changed", {
				theme: selectedTheme,
			})
			setTheme(selectedTheme)
		}
	}

	const handleOrgSwitch = () => {
		posthog.capture("org_switched")
		window.location.href = "/auth"
	}

	const logout = () => {
		cookieService.removeTokens()

		posthog.capture("logged_out")
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
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="gap-2 px-4">
							<DesktopIcon />
							<span>Theme</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuCheckboxItem
									className="gap-2"
									checked={theme === "system"}
									onCheckedChange={handleThemeChange(
										"system"
									)}
								>
									<span>System</span>
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									className="gap-2"
									checked={theme === "light"}
									onCheckedChange={handleThemeChange("light")}
								>
									<span>Light</span>
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									className="gap-2"
									checked={theme === "dark"}
									onCheckedChange={handleThemeChange("dark")}
								>
									<span>Dark</span>
								</DropdownMenuCheckboxItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="px-4"
						asChild
					>
						<div
							onClick={handleOrgSwitch}
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
