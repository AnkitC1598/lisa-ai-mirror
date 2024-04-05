"use client"

import { BookmarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import Back from "./Back"

const NavbarPrimaryActions = () => {
	const pathname = usePathname()

	return pathname === "/" ? (
		<Button
			variant="ghost"
			size="icon"
			className="relative"
			asChild
		>
			<Link href="/bookmarks">
				<BookmarkIcon className="h-6 w-6 shrink-0 text-gray-400" />
			</Link>
		</Button>
	) : (
		<Back />
	)
}

export default NavbarPrimaryActions
