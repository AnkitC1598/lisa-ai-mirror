"use client"

import { onboardUser } from "@/actions/user"
import Loading from "@/components/atoms/Loading"
import OnboardingOption from "@/components/organisms/OnboardingOption"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Preferences } from "@/constants/Preferences"
import { clientEnv } from "@/env/client"
import { cn } from "@/lib/utils"
import { preferenceSchema } from "@/schema/profile"
import useAIStore from "@/store"
import { InterestCategory } from "@/types/preferences"
import { IUserOnboarding } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import { getYear } from "date-fns"
import { motion } from "framer-motion"
import IPData from "ipdata"
import { useRouter } from "next/navigation"
import { usePostHog } from "posthog-js/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const Onboarding = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const user = useAIStore(store => store.user) as IUserOnboarding & {
		dob: string
	}
	const posthog = usePostHog()

	const form = useForm<z.infer<typeof preferenceSchema>>({
		resolver: zodResolver(preferenceSchema),
		defaultValues: async () => {
			let ipInfo
			if (
				!user.hasOwnProperty("location") ||
				(!user.location.city && !user.location.country)
			) {
				const ipdata = new IPData(clientEnv.NEXT_PUBLIC_IPDATA_API_KEY)
				ipInfo = await ipdata.lookup()
			} else {
				ipInfo = {
					city: user.location.city,
					country_name: user.location.country,
				}
			}
			return {
				...user,
				location: {
					city: ipInfo.city ?? "",
					country: ipInfo.country_name ?? "",
				},
				yob: Number(getYear(new Date(user.dob))),
			}
		},
	})

	const { isDirty, isValid, errors } = form.formState

	const onSubmit = async (values: z.infer<typeof preferenceSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setIsLoading(true)
		onboardUser({ body: values })
			.then(() => {
				posthog.capture("onboarded")
				router.push(`/`)
				setIsLoading(false)
			})
			.catch(error => {
				console.debug(`🚀 ~ onSubmit ~ error:`, error)
				setIsLoading(false)
			})
	}

	return (
		<>
			<div className="flex h-full flex-col gap-4 overflow-hidden">
				<div className="flex flex-col gap-2 px-4 pt-4">
					<span className="text-xl font-semibold">
						Help lisa understand you better
					</span>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex h-[calc(100%_-_64px)] flex-col gap-4"
					>
						<div className="flex flex-col gap-6 overflow-y-auto px-4 scrollbar">
							<FormField
								control={form.control}
								name="gender"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="text-sm font-medium uppercase text-gray-500 dark:text-gray-500">
											First things first, you identify as
											...
										</FormLabel>
										<FormControl>
											<div className="flex flex-wrap gap-4">
												<OnboardingOption
													single
													option={{
														label: "Male",
														value: "male",
														icon: null,
													}}
													value={field.value}
													onChange={field.onChange}
												/>
												<OnboardingOption
													single
													option={{
														label: "Female",
														value: "female",
														icon: null,
													}}
													value={field.value}
													onChange={field.onChange}
												/>
												<OnboardingOption
													single
													option={{
														label: "Others",
														value: "others",
														icon: null,
													}}
													value={field.value}
													onChange={field.onChange}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="yob"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="text-sm font-medium uppercase text-gray-600 dark:text-gray-500">
											Birth Year
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												max={new Date().getFullYear()}
												step="1"
												className={cn(
													"max-w-[50%] rounded-full focus-visible:ring-0 focus-visible:ring-offset-0",
													field.value
														? "border-purple-900/10 bg-purple-200/40 text-purple-900 dark:border-purple-600/20 dark:bg-purple-400/10 dark:text-purple-400"
														: ""
												)}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-col space-y-4">
								<span className="text-sm font-medium uppercase text-gray-600 dark:text-gray-500">
									Location
								</span>
								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="location.city"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="City"
														className={cn(
															"rounded-full focus-visible:ring-0 focus-visible:ring-offset-0",
															field.value
																? "border-purple-900/10 bg-purple-200/40 text-purple-900 dark:border-purple-600/20 dark:bg-purple-400/10 dark:text-purple-400"
																: ""
														)}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="location.country"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="Country"
														className={cn(
															"rounded-full focus-visible:ring-0 focus-visible:ring-offset-0",
															field.value
																? "border-purple-900/10 bg-purple-200/40 text-purple-900 dark:border-purple-600/20 dark:bg-purple-400/10 dark:text-purple-400"
																: ""
														)}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							{Preferences.map(({ title, key, options }) => (
								<FormField
									key={key}
									control={form.control}
									name={`interests.${key}`}
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel className="text-sm font-medium uppercase text-gray-600 dark:text-gray-500">
												{title}
											</FormLabel>
											<FormControl>
												<OptionsContainer
													options={options}
													field={field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>
						<div className="flex flex-1 flex-col gap-2 px-4 pb-4 text-center">
							{errors &&
							errors.interests &&
							errors.interests.root ? (
								<p className="text-xs font-medium text-red-500 dark:text-red-600">
									{errors.interests.root.message}
								</p>
							) : (
								<div className="text-xs">
									Choose minimum 7 interests
								</div>
							)}
							<Button
								variant={isDirty ? "default" : "secondary"}
								className={cn(
									"w-full text-sm",
									isDirty
										? "bg-purple-600 text-neutral-50 hover:bg-purple-500/90 dark:bg-purple-900 dark:text-neutral-50 dark:hover:bg-purple-900/90"
										: ""
								)}
								disabled={!isDirty || isLoading}
							>
								{isLoading ? (
									<Loading className="text-purple-200" />
								) : (
									<>Start Learning &nbsp; 🎉</>
								)}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	)
}

export default Onboarding

const OptionsContainer = ({
	options,
	field,
}: {
	options: InterestCategory[]
	field: any
}) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false)

	return (
		<>
			<motion.div
				initial={false}
				animate={{
					height: options.length <= 11 || isExpanded ? "auto" : 152,
				}}
				transition={{ duration: 0.5 }}
				className="flex flex-wrap gap-4 overflow-hidden"
			>
				{options.map(option => (
					<OnboardingOption
						key={`${option.value}_${option.label}`}
						option={option}
						value={field.value}
						onChange={field.onChange}
					/>
				))}
			</motion.div>
			{options.length > 11 ? (
				<Button
					type="button"
					variant="base"
					className="mx-auto w-min gap-2 rounded-full border-0"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					<span>Show {isExpanded ? "Less" : "More"}</span>
					{isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
				</Button>
			) : null}
		</>
	)
}
