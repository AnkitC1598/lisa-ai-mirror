import createJiti from "jiti";
import { fileURLToPath } from "node:url";
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env/client");
jiti("./src/env/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: process.env.BASE_PATH || "",
	async redirects() {
		return [
			// Basic redirect
			{
				source: '/topic',
				destination: '/',
				permanent: true,
			},
		]
	},
};

export default nextConfig;
