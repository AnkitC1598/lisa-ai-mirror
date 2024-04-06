"use client"

import { updateUser } from "@/actions/user"
import logo from "@/app/favicon.ico"
import OnboardingOption from "@/components/organisms/OnboardingOption"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Preferences } from "@/constants/Preferences"
import { profileSchema } from "@/schema/profile"
import useAIStore from "@/store"
import { IFormUser, IUser } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const EditProfile = () => {
	const router = useRouter()
	const user = useAIStore(store => store.user) as IFormUser

	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			...user,
			dob: format(new Date(user.dob), "yyyy-MM-dd"),
		},
	})

	const { isDirty, isValid } = form.formState

	function onSubmit(values: z.infer<typeof profileSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		const { data } = profileSchema.safeParse(values) as {
			success: boolean
			data: IUser
		}
		updateUser({ body: data }).then(() => router.push(`/profile`))
		// form.reset()
	}

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css"
				/>
			</Head>
			<div className="flex h-full flex-col overflow-y-auto scrollbar">
				<div className="relative aspect-[8/3] w-full shrink-0 overflow-hidden bg-purple-50 dark:bg-purple-950/30">
					<Image
						src={user.coverImage ?? logo}
						alt={user.firstname}
						fill
						objectFit="contain"
					/>
				</div>
				<div className="flex flex-col gap-4 divide-y divide-neutral-200 p-4 dark:divide-neutral-800">
					<div className="relative z-10 -mt-16 flex h-24 w-24 overflow-hidden rounded-md border-4 border-white bg-white dark:bg-neutral-800">
						<Image
							src={user.profileImage}
							alt={user.firstname}
							fill
						/>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-2 divide-y divide-neutral-200 dark:divide-neutral-800"
						>
							<div className="flex flex-col gap-4 pt-4">
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Personal details
								</span>
								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="firstname"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
													Name
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													This is your public test
													name.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="lastname"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
													Name
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													This is your public test
													name.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
												Username
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>
												This is your public test name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
												About
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>
												This is your public test name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="dob"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
													Date of Birth
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														type="date"
													/>
												</FormControl>
												<FormDescription>
													This is your public test
													name.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="gender"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
													Gender
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													This is your public test
													name.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="location.city"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
													City
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													This is your public test
													name.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="location.country"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
													Country
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													This is your public test
													name.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
												Email
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>
												This is your public test name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="mobile.phoneNumber"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
												Phone Number
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>
												This is your public test name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex flex-col gap-1 pt-4">
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Social Profiles
								</span>
								<FormField
									control={form.control}
									name="socials.github"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
												Github
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>
												This is your public test name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="socials.instagram"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
												Instagram
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>
												This is your public test name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="socials.linkedIn"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
												LinkedIn
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>
												This is your public test name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="socials.twitter"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel className="text-sm font-medium text-gray-600 dark:text-gray-400">
												Twitter
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>
												This is your public test name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex flex-col gap-4 pt-4">
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Preferences
								</span>
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
																value={
																	field.value
																}
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
							<div className="pt-4">
								<Button
									type="submit"
									className="w-full bg-purple-500 text-neutral-50 hover:bg-purple-500/90 dark:bg-purple-900 dark:text-neutral-50 dark:hover:bg-purple-900/90"
									disabled={!(isDirty && isValid)}
								>
									Save
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</>
	)
}

export default EditProfile
