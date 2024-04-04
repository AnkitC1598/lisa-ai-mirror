import ParallelTabbedLayout from "./ParallelTabbedLayout"

interface ITopicContentLayout {
	children: React.ReactNode
	chat: React.ReactNode
	practiceQuestions: React.ReactNode
	resources: React.ReactNode
}

const TopicContentLayout: React.FC<Readonly<ITopicContentLayout>> = async ({
	children,
	chat,
	practiceQuestions,
	resources,
}) => {
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
