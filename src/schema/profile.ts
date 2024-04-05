import { z } from "zod"

export const preferenceSchema = z.object({
	gender: z.string(),
	yob: z.coerce.number().lte(new Date().getFullYear()),
	location: z.object({ country: z.string(), city: z.string() }),
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
				return totalValues > 5
			},
			{
				message: "Sum of all values must be more than 5",
			}
		),
})

export const profileSchema = z.object({
	firstname: z.string(),
	lastname: z.string(),
	email: z.string(),
	mobile: z.object({
		countryCode: z.string(),
		phoneNumber: z.number(),
	}),
	username: z.string(),
	description: z.string(),
	profileImage: z.string(),
	coverImage: z.string(),
	gender: z.string(),
	dob: z.string(),
	location: z.object({ country: z.string(), city: z.string() }),
	socials: z.object({
		github: z.string(),
		instagram: z.string(),
		linkedIn: z.string(),
		twitter: z.string(),
	}),
	interests: preferenceSchema.shape.interests,
})
