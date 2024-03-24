/** @type {import('next').NextConfig} */
const nextConfig = {
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
