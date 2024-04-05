import { getUser } from "@/actions/user"
import icon from "@/app/favicon.ico"
import { cn } from "@/lib/utils"
import { SparklesIcon } from "@heroicons/react/16/solid"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavbarPrimaryActions from "./NavbarPrimaryActions"
import SearchMenu from "./SearchMenu"

interface INavbar {
	logoOnly?: boolean
}

const Navbar: React.FC<INavbar> = async ({ logoOnly = false }) => {
	const user = await getUser()

	return (
		<>
			<div
				className={cn(
					"grid max-h-16 w-full items-center justify-between p-4 shadow dark:shadow-neutral-800",
					logoOnly ? "grid-cols-1" : "grid-cols-3"
				)}
			>
				{logoOnly ? null : <NavbarPrimaryActions />}
				<Link
					href="/"
					className="flex items-center justify-center gap-1"
				>
					<div className="relative aspect-square h-8">
						<Image
							src={icon}
							alt="icon"
							fill
						/>
					</div>
					<div className="flex">
						<span className="flex gap-1 whitespace-nowrap text-2xl font-semibold tracking-wider">
							<span>lisa</span>
							<span className="bg-clip-text font-extrabold text-purple-600 dark:bg-[linear-gradient(56.07deg,_#9333EA_16.26%,_#CB92FF_66.17%)] dark:text-transparent">
								AI
							</span>
						</span>
						<SparklesIcon className="h-3.5 w-3.5 flex-shrink-0 -rotate-90 fill-yellow-400" />
					</div>
				</Link>
				{logoOnly ? null : (
					<div className="flex items-center justify-end gap-2">
						<SearchMenu />
						<Button
							variant="link"
							asChild
						>
							<Link
								href="/profile"
								className="relative aspect-square h-8 overflow-hidden rounded-full !p-0"
							>
								<Image
									src={user.profileImage ?? icon}
									alt={user.fullname}
									fill
								/>
							</Link>
						</Button>
					</div>
				)}
			</div>
		</>
	)
}

export default Navbar
