import Navbar from "@/components/organisms/Navbar"

interface IOnboardingLayout {
	children: React.ReactNode
}

const OnboardingLayout: React.FC<Readonly<IOnboardingLayout>> = ({
	children,
}) => {
	return (
		<>
			<Navbar logoOnly />
			<main className="h-navScreen flex-1 overflow-hidden p-4">
				{children}
			</main>
		</>
	)
}

export default OnboardingLayout
