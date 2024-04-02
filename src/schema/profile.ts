import { z } from "zod"

export const preferenceSchema = z.object({
	gender: z.string(),
	yob: z.number().lte(new Date().getFullYear()),
	location: z.object({ country: z.string(), city: z.string() }),
	interests: z.object({
		creativity: z.string().array().min(1),
		goingOut: z.string().array().min(1),
		stayingIn: z.string().array().min(1),
		filmTv: z.string().array().min(1),
		reading: z.string().array().min(1),
		music: z.string().array().min(1),
		foodDrinking: z.string().array().min(1),
		traveling: z.string().array().min(1),
		pets: z.string().array().min(1),
		valuesTraits: z.string().array().min(1),
	}),
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
