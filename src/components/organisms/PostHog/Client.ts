import { clientEnv } from "@/env/client"
import { PostHog } from "posthog-node"

const PostHogClient = () => {
	const posthogClient = new PostHog(clientEnv.NEXT_PUBLIC_POSTHOG_KEY, {
		host: clientEnv.NEXT_PUBLIC_POSTHOG_HOST,
		flushAt: 1,
		flushInterval: 0,
	})
	return posthogClient
}

export default PostHogClient
