import { getUser } from "@/actions/user"
import logo from "@/app/favicon.ico"
import OnboardingOption from "@/components/organisms/OnboardingOption"
import { Button } from "@/components/ui/button"
import { Preferences } from "@/constants/Preferences"
import { LockClosedIcon } from "@heroicons/react/16/solid"
import {
	GitHubLogoIcon,
	InstagramLogoIcon,
	TwitterLogoIcon,
} from "@radix-ui/react-icons"
import { differenceInCalendarYears, format } from "date-fns"
import type { Metadata } from "next"
import Image from "next/image"
import ProfileMenu from "./profileMenu"

export const metadata: Metadata = {
	title: "Profile",
	description:
		"Welcome to your Lisa AI profile page. Manage your account details, track your learning progress, and customize your learning preferences. Click to personalise your educational journey with Lisa AI.",
}

const Profile = async () => {
	const user = await getUser()

	return (
		<>
			<div className="flex h-full flex-col overflow-y-auto scrollbar">
				<div className="relative aspect-[8/3] w-full shrink-0 overflow-hidden bg-purple-50 dark:bg-purple-950/30">
					<Image
						src={user.coverImage ?? logo}
						alt={user.fullname}
						fill
						objectFit="contain"
					/>
				</div>
				<div className="flex flex-col gap-4 divide-y divide-neutral-200 p-4 dark:divide-neutral-800">
					<div className="flex flex-col gap-4">
						<div className="relative z-10 -mt-16 flex h-24 w-24 overflow-hidden rounded-md border-4 border-white bg-white dark:bg-neutral-800">
							<Image
								src={user.profileImage ?? logo}
								alt={user.fullname}
								fill
							/>
						</div>
						<div className="flex items-center justify-between gap-4">
							<div className="flex flex-col gap-1">
								<h3 className="text-xl font-bold text-slate-900 dark:text-slate-200">
									{user.fullname}
								</h3>
								<span className="truncate text-sm text-slate-500 dark:text-slate-400">
									@{user.username}
								</span>
							</div>
							<ProfileMenu />
						</div>
					</div>
					<div className="flex flex-col gap-4 pt-4">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Personal details
						</span>
						{user.description ? (
							<div className="flex flex-col gap-1">
								<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
									About
								</span>
								<span className="text-sm">
									{user.description}
								</span>
							</div>
						) : null}
						{user.dob ? (
							<div className="flex flex-col gap-1">
								<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Age
								</span>
								<span className="text-sm">
									{format(new Date(user.dob), "dd MMMM yyyy")}
									,{" "}
									{differenceInCalendarYears(
										new Date(),
										new Date(user.dob)
									)}
									yrs
								</span>
							</div>
						) : null}
						{user.gender ? (
							<div className="flex flex-col gap-1">
								<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Gender
								</span>
								<span className="text-sm capitalize">
									{user.gender}
								</span>
							</div>
						) : null}
						{Object.values(user.location).filter(Boolean).length ? (
							<div className="flex flex-col gap-1">
								<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Location
								</span>
								<span className="text-sm">
									{user.location.city},{" "}
									{user.location.country}
								</span>
							</div>
						) : null}
						{user.email ? (
							<div className="flex flex-col gap-1">
								<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Email
								</span>
								<span className="text-sm">{user.email}</span>
							</div>
						) : null}
						{Object.values(user.mobile).filter(Boolean).length &&
						user.mobile.numberWithCountryCode ? (
							<div className="flex flex-col gap-1">
								<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Phone
								</span>
								<div className="flex justify-between gap-4">
									<span className="text-sm">
										{user.mobile.numberWithCountryCode}
									</span>
									<LockClosedIcon className="h-4 w-4 fill-neutral-500" />
								</div>
							</div>
						) : null}
					</div>
					{user.hasOwnProperty("socials") &&
					Object.values(user.socials).filter(Boolean).length ? (
						<div className="flex flex-col gap-1 pt-4">
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Social Profiles
							</span>
							<div className="flex gap-4">
								{user.socials.github ? (
									<Button
										variant="outline"
										size="icon"
										asChild
									>
										<a href={user.socials.github}>
											<GitHubLogoIcon className="h-4 w-4" />
										</a>
									</Button>
								) : null}
								{user.socials.instagram ? (
									<Button
										variant="outline"
										size="icon"
										asChild
									>
										<a href={user.socials.instagram}>
											<InstagramLogoIcon className="h-4 w-4" />
										</a>
									</Button>
								) : null}
								{user.socials.twitter ? (
									<Button
										variant="outline"
										size="icon"
										asChild
									>
										<a href={user.socials.twitter}>
											<TwitterLogoIcon className="h-4 w-4" />
										</a>
									</Button>
								) : null}
							</div>
						</div>
					) : null}
					{Object.values(user.interests).flat().length ? (
						<div className="flex flex-col gap-4 pt-4">
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Preferences
							</span>
							{Preferences.map(preference =>
								user.interests[preference.key].length ? (
									<div
										key={preference.key}
										className="flex flex-col gap-1"
									>
										<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
											{preference.title}
										</span>
										<div className="flex flex-wrap gap-4">
											{preference.options
												.filter(option =>
													user.interests[
														preference.key
													].includes(option.value)
												)
												.map(option => (
													<OnboardingOption
														key={`${option.value}_${option.label}`}
														option={option}
														value={
															user.interests[
																preference.key
															]
														}
														disabled
													/>
												))}
										</div>
									</div>
								) : null
							)}
						</div>
					) : null}
					<div className="flex flex-col gap-1 pt-4">
						<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
							Joined on
						</span>
						<span className="text-sm">
							{format(new Date(user.createdAt), "MMMM yyyy")}
						</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
