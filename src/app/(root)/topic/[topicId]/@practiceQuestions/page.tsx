import PracticeQuestion from "@/components/organisms/PracticeQuestion"
import { Accordion } from "@/components/ui/accordion"

const PracticeQuestions = () => {
	return (
		<>
			<div className="px-4">
				<Accordion
					type="single"
					collapsible
					className="space-y-4"
				>
					{Array.from({ length: 18 }, (_, i) => (
						<PracticeQuestion
							key={i}
							idx={i}
						/>
					))}
				</Accordion>
			</div>
		</>
	)
}

export default PracticeQuestions
