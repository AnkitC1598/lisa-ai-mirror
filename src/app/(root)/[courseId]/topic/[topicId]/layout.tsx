import { sleep } from "@/lib"
import { cache } from "react"
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
						practiceQuestions: practiceQuestions,
						resources,
					}}
				/>
			</div>
		</>
	)
}

export default TopicContentLayout
