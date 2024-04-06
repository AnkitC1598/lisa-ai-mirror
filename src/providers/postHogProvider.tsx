// app/providers.tsx
"use client"
import { clientEnv } from "@/env/client"
import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

if (typeof window !== "undefined") {
	posthog.init(clientEnv.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: clientEnv.NEXT_PUBLIC_POSTHOG_HOST,
		capture_pageview: false, // Disable automatic pageview capture, as we capture manually
		enable_recording_console_log: true,
	})
}
interface IPostHogProvider {
	children: React.ReactNode
}

const PostHogProvider: React.FC<Readonly<IPostHogProvider>> = ({
	children,
}) => {
	return <PHProvider client={posthog}>{children}</PHProvider>
}

export default PostHogProvider
