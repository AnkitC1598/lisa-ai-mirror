import "@/app/globals.css"
import Loading from "@/components/atoms/Loading"
import PostHogPageView from "@/components/organisms/PostHog/PageView"
import { serverEnv } from "@/env/server"
import { cn } from "@/lib/utils"
import AuthProvider from "@/providers/authProvider"
import NextThemeProvider from "@/providers/nextThemeProvider"
import PostHogProvider from "@/providers/postHogProvider"
import type { Viewport } from "next"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	// Also supported by less commonly used
	// interactiveWidget: 'resizes-visual',
}

export const metadata: Metadata = {
	title: {
		template: "lisa AI - %s",
		default: "lisa AI - Start Learning",
	},
	description: "Dive into learning with Lisa AI",
	manifest: `${serverEnv.BASE_PATH}/manifest.json`,
	openGraph: {
		title: "lisa AI - Start Learning",
		description: "Dive into learning with Lisa AI",
		siteName: "lisa AI",
		images: [
			{
				url: "https://lucdn.letsupgrade.net/assets/Auth_Meta_e7469c8fd7.jpg",
				width: 1200,
				height: 628,
				alt: "lisa AI - Start Learning",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "lisa AI - Start Learning",
		description: "Dive into learning with Lisa AI",
		images: [
			"https://lucdn.letsupgrade.net/assets/Auth_Meta_e7469c8fd7.jpg",
		],
	},
}

interface IAppLayout {
	children: React.ReactNode
}

const AppLayout: React.FC<Readonly<IAppLayout>> = ({ children }) => {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<PostHogProvider>
				<body
					className={cn(
						inter.className,
						"flex h-screen w-screen justify-center overflow-hidden bg-neutral-50 text-gray-900 transition-all duration-300 ease-in-out dark:bg-neutral-950 dark:text-gray-200"
					)}
				>
					<main className="flex h-screen w-screen justify-center md:p-4">
						<NextThemeProvider
							attribute="class"
							defaultTheme="dark"
							enableSystem
						>
							<Suspense>
								<PostHogPageView />
							</Suspense>
							<div className="relative flex w-full max-w-md flex-col overflow-hidden bg-[url('/lisa-ai/white-gridlines.png')] bg-cover dark:bg-[url('/lisa-ai/starry-sky.png')] md:rounded-md md:border md:border-neutral-500">
								<Suspense
									fallback={
										<div className="flex h-full w-full items-center justify-center py-8">
											<Loading icon />
										</div>
									}
								>
									<AuthProvider>{children}</AuthProvider>
								</Suspense>
							</div>
						</NextThemeProvider>
					</main>
				</body>
			</PostHogProvider>
		</html>
	)
}

export default AppLayout
