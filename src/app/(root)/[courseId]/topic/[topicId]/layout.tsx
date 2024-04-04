import { sleep } from "@/lib"
import { cache } from "react"
import { AI as QuestionsAI } from "./@practiceQuestions/action"
import ParallelTabbedLayout from "./ParallelTabbedLayout"

interface ITopicContentLayout {
	children: React.ReactNode
	chat: React.ReactNode
	practiceQuestions: React.ReactNode
	resources: React.ReactNode
}

const getTopicContent = cache(async () => {
	await sleep(1000)
	return []
})

const TopicContentLayout: React.FC<Readonly<ITopicContentLayout>> = async ({
	children,
	chat,
	practiceQuestions,
	resources,
}) => {
	await getTopicContent()

	return (
		<>
			<div className="flex h-full flex-col gap-4 overflow-hidden">
				<ParallelTabbedLayout
					{...{
						home: children,
						chat,
						practiceQuestions: (
							<QuestionsAI>{practiceQuestions}</QuestionsAI>
						),
						resources,
					}}
				/>
			</div>
		</>
	)
}

export default TopicContentLayout
