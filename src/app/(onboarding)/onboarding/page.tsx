import ContentPagination from "@/components/organisms/ContentPagination"
import OnboardingQuestion from "@/components/organisms/OnboardingQuestion"
import { Button } from "@/components/ui/button"

const Onboarding = () => {
	return (
		<>
			<div className="flex h-full flex-col gap-4 overflow-hidden">
				<ContentPagination />
				<div className="flex flex-col gap-2">
					<span className="text-2xl font-semibold">
						Help lisa understand you better
					</span>
					<span className="text-sm text-gray-500">
						Pick 3 or more things from each that resonate with your
						interests
					</span>
				</div>
				<div className="flex h-full flex-col gap-4 overflow-y-auto scrollbar">
					<OnboardingQuestion />
					<OnboardingQuestion />
					<OnboardingQuestion />
					<OnboardingQuestion />
					<OnboardingQuestion />
					<Button
						variant="secondary"
						className="bg-purple-500 text-neutral-50 hover:bg-purple-500/90 dark:bg-purple-900 dark:text-neutral-50 dark:hover:bg-purple-900/90"
						disabled
					>
						Done
					</Button>
				</div>
			</div>
		</>
	)
}

export default Onboarding
