import Navbar from "@/components/organisms/Navbar"
import { Metadata } from "next"

interface IOnboardingLayout {
	children: React.ReactNode
}

export const metadata: Metadata = {
	title: "Onboarding - First Few Steps",
	description:
		"Start your AI education journey with Lisa AI. Discover our innovative features and transform your learning. Click the link below to begin!",
	openGraph: {
		title: "Onboarding - First Few Steps",
		description:
			"Start your AI education journey with Lisa AI. Discover our innovative features and transform your learning. Click the link below to begin!",
	},
	twitter: {
		title: "Onboarding - First Few Steps",
		description:
			"Start your AI education journey with Lisa AI. Discover our innovative features and transform your learning. Click the link below to begin!",
	},
}

const OnboardingLayout: React.FC<Readonly<IOnboardingLayout>> = ({
	children,
}) => {
	return (
		<>
			<Navbar logoOnly />
			<main className="h-navScreen flex-1 overflow-hidden">
				{children}
			</main>
		</>
	)
}

export default OnboardingLayout
