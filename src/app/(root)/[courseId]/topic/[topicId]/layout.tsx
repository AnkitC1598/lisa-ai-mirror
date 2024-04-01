import { sleep } from "@/lib"
import { cache } from "react"
import ParallelTabbedLayout from "./ParallelTabbedLayout"
import { AI } from "./action"

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
		<AI>
			<div className="flex h-full flex-col gap-4 overflow-hidden">
				<ParallelTabbedLayout
					{...{ home: children, chat, practiceQuestions, resources }}
				/>
			</div>
		</AI>
	)
}

export default TopicContentLayout
