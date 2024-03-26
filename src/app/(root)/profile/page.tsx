import { Option } from "@/components/organisms/OnboardingQuestion"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	EllipsisVerticalIcon,
	LockClosedIcon,
	PencilIcon,
} from "@heroicons/react/16/solid"
import {
	GitHubLogoIcon,
	InstagramLogoIcon,
	TwitterLogoIcon,
} from "@radix-ui/react-icons"
import { format } from "date-fns"
import Link from "next/link"

const Profile = () => {
	return (
		<>
			<div className="flex h-full flex-col overflow-y-auto scrollbar">
				<div className="relative aspect-[8/3] w-full shrink-0 overflow-hidden bg-purple-50 dark:bg-purple-950/30"></div>
				<div className="flex flex-col gap-4 divide-y divide-neutral-200 p-4 dark:divide-neutral-800">
					<div className="flex flex-col gap-4">
						<div className="flex justify-between gap-4">
							<div className="z-10 -mt-16 flex h-24 w-24 overflow-hidden rounded-md border-4 border-white bg-white dark:bg-neutral-800"></div>
							<Button
								size="icon"
								variant="outline"
								asChild
							>
								<Link href="/profile/edit">
									<PencilIcon className="h-4 w-4" />
								</Link>
							</Button>
						</div>
						<div className="flex items-center justify-between gap-4">
							<div className="flex flex-col gap-1">
								<h3 className="text-xl font-bold text-slate-900 dark:text-slate-200">
									fullname
								</h3>
								<span className="truncate text-sm text-slate-500 dark:text-slate-400">
									@username
								</span>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										size="icon"
										variant="outline"
									>
										<EllipsisVerticalIcon className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>
										My Account
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuItem>Billing</DropdownMenuItem>
									<DropdownMenuItem>Team</DropdownMenuItem>
									<DropdownMenuItem>
										Subscription
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<div className="flex flex-col gap-4 pt-4">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Personal details
						</span>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								About
							</span>
							<span className="text-sm">
								Lorem ipsum dolor, sit amet consectetur
								adipisicing elit. Culpa soluta doloremque
								explicabo quibusdam quos fugiat ea eligendi
								accusantium velit a, quis asperiores, sapiente
								temporibus. Eius adipisci eos mollitia eum
								tempore?
							</span>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Age
							</span>
							<span className="text-sm">
								{format(new Date(), "dd MMMM yyyy")}, 24yrs
							</span>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Gender
							</span>
							<span className="text-sm">Male</span>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Location
							</span>
							<span className="text-sm">Mumbai, Maharashtra</span>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Email
							</span>
							<span className="text-sm">dummy@gmail.com</span>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Phone
							</span>
							<div className="flex justify-between gap-4">
								<span className="text-sm">+919876543210</span>
								<LockClosedIcon className="h-4 w-4 fill-neutral-500" />
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-1 pt-4">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Social Profiles
						</span>
						<div className="flex gap-4">
							<Button
								variant="outline"
								size="icon"
								asChild
							>
								<a href="#">
									<GitHubLogoIcon className="h-4 w-4" />
								</a>
							</Button>
							<Button
								variant="outline"
								size="icon"
								asChild
							>
								<a href="#">
									<InstagramLogoIcon className="h-4 w-4" />
								</a>
							</Button>
							<Button
								variant="outline"
								size="icon"
								asChild
							>
								<a href="#">
									<TwitterLogoIcon className="h-4 w-4" />
								</a>
							</Button>
						</div>
					</div>
					<div className="flex flex-col gap-4 pt-4">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Preferences
						</span>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Favorite Hobby
							</span>
							<div className="flex flex-wrap gap-4">
								{Array.from({ length: 3 }).map((_, i) => (
									<Option
										key={i}
										selected
									/>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Creativity Interests
							</span>
							<div className="flex flex-wrap gap-4">
								{Array.from({ length: 9 }).map((_, i) => (
									<Option
										key={i}
										selected
									/>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Your favorite music genre is ...
							</span>
							<div className="flex flex-wrap gap-4">
								{Array.from({ length: 3 }).map((_, i) => (
									<Option
										key={i}
										selected
									/>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Food cuisine preferences
							</span>
							<div className="flex flex-wrap gap-4">
								{Array.from({ length: 1 }).map((_, i) => (
									<Option
										key={i}
										selected
									/>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Movie genre
							</span>
							<div className="flex flex-wrap gap-4">
								{Array.from({ length: 7 }).map((_, i) => (
									<Option
										key={i}
										selected
									/>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Profession
							</span>
							<div className="flex flex-wrap gap-4">
								{Array.from({ length: 2 }).map((_, i) => (
									<Option
										key={i}
										selected
									/>
								))}
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-1 pt-4">
						<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
							Joined on
						</span>
						<span className="text-sm">
							{format(new Date(), "MMMM yyyy")}
						</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
