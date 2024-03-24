interface IOnboardingLayout {
	children: React.ReactNode
}

const OnboardingLayout: React.FC<Readonly<IOnboardingLayout>> = ({
	children,
}) => {
	return children
}

export default OnboardingLayout
