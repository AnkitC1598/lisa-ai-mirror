import { z } from "zod"

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
})
