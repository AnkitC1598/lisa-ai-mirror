import { z } from "zod"

export const preferenceSchema = z.object({
	gender: z.string(),
	yob: z.number().lte(new Date().getFullYear()),
	location: z.object({ country: z.string(), city: z.string() }),
	interests: z.object({
		creativity: z.string().array().min(1, {
			message: "Select at least one interest",
		}),
		goingOut: z.string().array().min(1, {
			message: "Select at least one interest",
		}),
		stayingIn: z.string().array().min(1, {
			message: "Select at least one interest",
		}),
		filmTv: z.string().array().min(1, {
			message: "Select at least one interest",
		}),
		reading: z.string().array().min(1, {
			message: "Select at least one interest",
		}),
		music: z.string().array().min(1, {
			message: "Select at least one interest",
		}),
		foodDrinking: z.string().array().min(1, {
			message: "Select at least one interest",
		}),
		traveling: z.string().array().min(1, {
			message: "Select at least one interest",
		}),
		pets: z.string().array().min(1, {
			message: "Select at least one interest",
		}),
		valuesTraits: z.string().array().min(1, {
			message: "Select at least one interest",
		}),
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
