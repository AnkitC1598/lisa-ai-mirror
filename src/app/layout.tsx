import "@/app/globals.css"
import { cn } from "@/lib/utils"
import AuthProvider from "@/providers/authProvider"
import NextThemeProvider from "@/providers/nextThemeProvider"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "lisa AI",
	description: "lisa AI",
	manifest: "/lisa-ai/manifest.json",
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
			<body
				className={cn(
					inter.className,
					"flex h-screen w-screen justify-center overflow-hidden bg-gray-50 text-gray-900 transition-all duration-300 ease-in-out dark:bg-neutral-950 dark:text-gray-200"
				)}
			>
				<NextThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
				>
					<div className="flex w-full max-w-md flex-col border">
						<Suspense fallback={<>Loading...</>}>
							<AuthProvider>{children}</AuthProvider>
						</Suspense>
					</div>
				</NextThemeProvider>
			</body>
		</html>
	)
}

export default AppLayout
