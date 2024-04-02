"use client"

import { BookmarkIcon } from "@heroicons/react/16/solid"
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
				<BookmarkIcon className="h-4 w-4 shrink-0" />
			</Link>
		</Button>
	) : (
		<Back />
	)
}

export default NavbarPrimaryActions