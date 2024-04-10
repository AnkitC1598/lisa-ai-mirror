import Navbar from "@/components/organisms/Navbar"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

interface IRootLayout {
	children: React.ReactNode
}

const RootLayout: React.FC<Readonly<IRootLayout>> = ({ children }) => {
	return (
		<>
			<Suspense
				fallback={
					<div className="flex h-16 w-full items-center justify-between p-4">
						<Skeleton className="h-full w-10" />
						<Skeleton className="h-full w-1/4" />
						<Skeleton className="h-full w-10" />
					</div>
				}
			>
				<Navbar />
			</Suspense>
			<div className="h-navScreen flex-1 overflow-hidden">{children}</div>
		</>
	)
}

export default RootLayout
