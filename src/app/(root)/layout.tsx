import Navbar from "@/components/organisms/Navbar"

interface IRootLayout {
	children: React.ReactNode
}

const RootLayout: React.FC<Readonly<IRootLayout>> = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className="h-navScreen flex-1 overflow-hidden">
				{children}
			</main>
		</>
	)
}

export default RootLayout
