import { z } from "zod"

export const preferenceSchema = z.object({
	gender: z.string().min(1, { message: "Gender is required" }),
	yob: z.coerce
		.number()
		.lte(new Date().getFullYear(), {
			message: "Year of birth cannot be in the future",
		})
		.gte(1900, {
			message: "Year of birth must be greater than or equal to 1900",
		}),
	location: z.object({
		country: z.string().min(1, { message: "Country is required" }),
		city: z.string().min(1, { message: "City is required" }),
	}),
	interests: z
		.object({
			creativity: z.string().array(),
			goingOut: z.string().array(),
			stayingIn: z.string().array(),
			filmTv: z.string().array(),
			reading: z.string().array(),
			music: z.string().array(),
			foodDrinking: z.string().array(),
			traveling: z.string().array(),
			pets: z.string().array(),
			valuesTraits: z.string().array(),
		})
		.refine(
			data => {
				const {
					creativity = [],
					goingOut = [],
					stayingIn = [],
					filmTv = [],
					reading = [],
					music = [],
					foodDrinking = [],
					traveling = [],
					pets = [],
					valuesTraits = [],
				} = data
				const totalValues =
					creativity.length +
					goingOut.length +
					stayingIn.length +
					filmTv.length +
					reading.length +
					music.length +
					foodDrinking.length +
					traveling.length +
					pets.length +
					valuesTraits.length
				return totalValues >= 7
			},
			{
				message: "At least 7 interests must be selected",
			}
		),
})

export const profileSchema = z.object({
	firstname: z.string().min(1, { message: "Firstname is required" }),
	lastname: z.string().min(1, { message: "Lastname is required" }),
	email: z
		.string()
		.email({ message: "Invalid email format" })
		.min(1, { message: "Email is required" }),
	mobile: z.object({
		countryCode: z.string().min(1, { message: "Country code is required" }),
		phoneNumber: z.number(),
	}),
	username: z.string().min(1, { message: "Username is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	profileImage: z.string().min(1, { message: "Profile image is required" }),
	coverImage: z.string().min(1, { message: "Cover image is required" }),
	gender: z.string().min(1, { message: "Gender is required" }),
	dob: z.string().min(1, { message: "Date of birth is required" }),
	location: z.object({
		country: z.string().min(1, { message: "Country is required" }),
		city: z.string().min(1, { message: "City is required" }),
	}),
	socials: z.object({
		github: z.string().min(1, { message: "Github is required" }),
		instagram: z.string().min(1, { message: "Instagram is required" }),
		linkedIn: z.string().min(1, { message: "LinkedIn is required" }),
		twitter: z.string().min(1, { message: "Twitter is required" }),
	}),
	interests: preferenceSchema.shape.interests,
})
