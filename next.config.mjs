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
