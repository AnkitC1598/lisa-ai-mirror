import { withSentryConfig } from "@sentry/nextjs"
import createJiti from "jiti"
import nextPWA from "next-pwa"
import { fileURLToPath } from "node:url"
const jiti = createJiti(fileURLToPath(import.meta.url))

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env/client")
jiti("./src/env/server")

const withPWA = nextPWA({
	dest: "public",
})

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
	basePath: process.env.BASE_PATH || "",
	async redirects() {
		return [
			// Basic redirect
			{
				source: "/topic",
				destination: "/",
				permanent: true,
			},
		]
	},
	experimental: {
		serverActions: {
			allowedOrigins: ["*.ghosters.tech", "*.lisaapp.in"],
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "npe-lisa-static.s3.ap-south-1.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "imgs.search.brave.com",
			},
		],
	},
})

let config = nextConfig

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN
const SENTRY_ORG = process.env.SENTRY_ORG
const SENTRY_PROJECT = process.env.SENTRY_PROJECT

// Injected content via Sentry wizard below and modified to work only when `SENTRY_DSN`, `SENTRY_ORG` & `SENTRY_PROJECT` is available
if (SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT)
	config = withSentryConfig(
		nextConfig,
		{
			// For all available options, see:
			// https://github.com/getsentry/sentry-webpack-plugin#options

			// Suppresses source map uploading logs during build
			silent: true,

			org: SENTRY_ORG,
			project: SENTRY_PROJECT,
		},
		{
			// For all available options, see:
			// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

			// Upload a larger set of source maps for prettier stack traces (increases build time)
			widenClientFileUpload: true,

			// Transpiles SDK to be compatible with IE11 (increases bundle size)
			transpileClientSDK: true,

			// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
			tunnelRoute: "/monitoring",

			// Hides source maps from generated client bundles
			hideSourceMaps: true,

			// Automatically tree-shake Sentry logger statements to reduce bundle size
			disableLogger: true,
		}
	)

export default config