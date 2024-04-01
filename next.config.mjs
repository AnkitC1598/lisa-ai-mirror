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
				protocol: 'https',
				hostname: 'npe-lisa-static.s3.ap-south-1.amazonaws.com',
			},
			{
				protocol: 'https',
				hostname: 'imgs.search.brave.com',
			},
		],
	},
})

export default nextConfig
