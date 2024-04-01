import Navbar from "@/components/organisms/Navbar"
import { Suspense } from "react"

interface IRootLayout {
	children: React.ReactNode
}

const RootLayout: React.FC<Readonly<IRootLayout>> = ({ children }) => {
	return (
		<>
			<Suspense fallback={<>Getting Profile?</>}>
				<Navbar />
			</Suspense>
			<main className="h-navScreen flex-1 overflow-hidden">
				{children}
			</main>
		</>
	)
}

export default RootLayout
