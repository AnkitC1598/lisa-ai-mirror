"use client"

import { onboardUser } from "@/actions/user"
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
import { cn } from "@/lib/utils"
import { preferenceSchema } from "@/schema/profile"
import useAIStore from "@/store"
import { IUserOnboarding } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { getYear } from "date-fns"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const Onboarding = () => {
	const router = useRouter()

	const user = useAIStore(store => store.user) as IUserOnboarding & {
		dob: string
	}

	const form = useForm<z.infer<typeof preferenceSchema>>({
		resolver: zodResolver(preferenceSchema),
		defaultValues: {
			...user,
			yob: Number(getYear(new Date(user.dob))),
		},
	})

	const onSubmit = async (values: z.infer<typeof preferenceSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		onboardUser({ body: values }).then(() => router.push(`/`))
	}

	return (
		<>
			<div className="flex h-full flex-col gap-4 overflow-hidden">
				<div className="flex flex-col gap-2 px-4 pt-4">
					<span className="text-2xl font-semibold">
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
										<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
										<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
							<div className="flex flex-col gap-y-1">
								<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
											<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
												{title}
											</FormLabel>
											<FormControl>
												<div className="flex flex-wrap gap-4">
													{options.map(option => (
														<OnboardingOption
															key={`${option.value}_${option.label}`}
															option={option}
															value={field.value}
															onChange={
																field.onChange
															}
														/>
													))}
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>
						<div className="flex-1 px-4 pb-4">
							<Button
								variant="secondary"
								className="w-full bg-purple-500 text-neutral-50 hover:bg-purple-500/90 dark:bg-purple-900 dark:text-neutral-50 dark:hover:bg-purple-900/90"
							>
								Done
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	)
}

export default Onboarding
