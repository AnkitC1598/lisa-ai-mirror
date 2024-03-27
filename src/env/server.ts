import { createEnv } from "@t3-oss/env-nextjs"
import { z, ZodError } from "zod"

export const serverEnv = createEnv({
	server: {
		BASE_PATH: z.string(),
		OPENAI_API_KEY: z.string(),
		CLIENT_API_URL: z.string(),
		ADMIN_API_URL: z.string(),
		ACCESS_PATH: z.string(),
	},
	runtimeEnv: {
		BASE_PATH: process.env.BASE_PATH,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		CLIENT_API_URL: process.env.CLIENT_API_URL,
		ADMIN_API_URL: process.env.ADMIN_API_URL,
		ACCESS_PATH: process.env.ACCESS_PATH,
	},
	onValidationError: (error: ZodError) => {
		console.error(
			"❌ Invalid server environment variables:",
			error.flatten().fieldErrors
		)
		throw new Error("Invalid server environment variables")
	},
	// Called when server variables are accessed on the client.
	onInvalidAccess: (variable: string) => {
		throw new Error(
			"❌ Attempted to access a server-side environment variable on the client"
		)
	},
})
