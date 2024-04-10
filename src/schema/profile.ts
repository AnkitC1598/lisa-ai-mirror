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
			data => calculateTotal(data) >= 7,
			data => {
				const diff = 7 - calculateTotal(data)
				return {
					message: `Choose ${diff} more interest${diff > 1 ? "s" : ""}`,
				}
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
	description: z.string().nullable().optional(),
	profileImage: z.string().nullable().optional(),
	coverImage: z.string().nullable().optional(),
	gender: z.string().min(1, { message: "Gender is required" }),
	dob: z.string().min(1, { message: "Date of birth is required" }),
	location: z.object({
		country: z.string().min(1, { message: "Country is required" }),
		city: z.string().min(1, { message: "City is required" }),
	}),
	socials: z.object({
		github: z.string().nullable().optional(),
		instagram: z.string().nullable().optional(),
		linkedIn: z.string().nullable().optional(),
		twitter: z.string().nullable().optional(),
	}),
	interests: preferenceSchema.shape.interests,
})

const calculateTotal = (data: any): number => {
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
	return (
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
	)
}
