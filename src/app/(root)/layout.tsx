import Loading from "@/components/atoms/Loading"
import Navbar from "@/components/organisms/Navbar"
import { Suspense } from "react"

interface IRootLayout {
	children: React.ReactNode
}

const RootLayout: React.FC<Readonly<IRootLayout>> = ({ children }) => {
	return (
		<>
			<Suspense
				fallback={
					<div className="flex h-16 w-full items-center justify-center">
						<Loading icon />
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
