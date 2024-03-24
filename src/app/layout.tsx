import "@/app/globals.css"
import { cn } from "@/lib/utils"
import NextThemeProvider from "@/providers/nextThemeProvider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "lisa AI",
	description: "lisa AI",
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
					// inter.className,
					"flex h-screen w-screen justify-center overflow-hidden bg-gray-50 text-gray-900 dark:bg-neutral-950 dark:text-gray-200"
				)}
			>
				<NextThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
				>
					<div className="flex w-full max-w-md flex-col border">
						{children}
					</div>
				</NextThemeProvider>
			</body>
		</html>
	)
}

export default AppLayout
