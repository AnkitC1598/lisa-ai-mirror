import { createEnv } from "@t3-oss/env-nextjs"
import { z, ZodError } from "zod"

export const clientEnv = createEnv({
	client: {
		NEXT_PUBLIC_BASE_PATH: z.string(),
		NEXT_PUBLIC_COOKIE_KEY: z.string(),
		NEXT_PUBLIC_SHOW_MAINTENANCE: z
			.string()
			.refine(s => s === "true" || s === "false")
			.transform(s => s === "true")
			.optional(),
		NEXT_PUBLIC_MAINTENANCE_END_DATE: z.string().optional(),
		NEXT_PUBLIC_SOCKET_URL: z.string(),
		NEXT_PUBLIC_HOST_DOMAIN: z.string(),
		NEXT_PUBLIC_APP_DOMAIN: z.string(),
		NEXT_PUBLIC_IPDATA_API_KEY: z.string(),
		NEXT_PUBLIC_POSTHOG_KEY: z.string(),
		NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
		NEXT_PUBLIC_COOKIE_KEY: process.env.NEXT_PUBLIC_COOKIE_KEY,
		NEXT_PUBLIC_SHOW_MAINTENANCE: process.env.NEXT_PUBLIC_SHOW_MAINTENANCE,
		NEXT_PUBLIC_MAINTENANCE_END_DATE:
			process.env.NEXT_PUBLIC_MAINTENANCE_END_DATE,
		NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
		NEXT_PUBLIC_HOST_DOMAIN: process.env.NEXT_PUBLIC_HOST_DOMAIN,
		NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
		NEXT_PUBLIC_IPDATA_API_KEY: process.env.NEXT_PUBLIC_IPDATA_API_KEY,
		NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
		NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
	},
	onValidationError: (error: ZodError) => {
		console.error(
			"❌ Invalid client environment variables:",
			error.flatten().fieldErrors
		)
		throw new Error(
			`❌ Invalid client environment variables: ${JSON.stringify(error.flatten().fieldErrors, null, 4)}`
		)
	},
})
