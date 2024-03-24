import icon from "@/app/favicon.ico"
import { ArrowLeftIcon, SparklesIcon } from "@heroicons/react/16/solid"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import SearchMenu from "./SearchMenu"

const Navbar = () => {
	return (
		<>
			<div className="grid max-h-16 w-full grid-cols-3 items-center justify-between p-4 shadow dark:shadow-neutral-800">
				<Button
					variant="ghost"
					size="icon"
				>
					<ArrowLeftIcon className="h-6 w-6" />
				</Button>
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
							<span className="text-purple-500">AI</span>
						</span>
						<SparklesIcon className="h-3 w-3 flex-shrink-0 fill-yellow-300" />
					</div>
				</Link>
				<div className="flex items-center justify-end gap-2">
					<SearchMenu hideOnHome />
					<Button
						variant="link"
						asChild
					>
						<Link
							href="/profile"
							className="relative aspect-square h-8"
						>
							<Image
								src={icon}
								alt="icon"
								fill
							/>
						</Link>
					</Button>
				</div>
			</div>
		</>
	)
}

export default Navbar
