import { getResources } from "@/actions/hierarchy"
import LinkPreview from "@/components/organisms/LinkPreview"
import { Metadata } from "next"

interface IHierarchySlugs {
	params: {
		courseId: string
		topicId: string
	}
	searchParams: {
		query: string
	}
}

export const getMetaInfo = (tab: string | string[]) => {
	switch (tab) {
		case "resources":
			return {
				title: "Resources - Start Learning",
				description:
					"Dive into Lisa AI's Resources tab while learning a new topic. After a 10-tap slide session, switch to this tab to explore similar content from the web, enhancing your understanding of the topic you're learning. Start your AI education journey with Lisa AI today.",
			}
		case "practiceQuestions":
			return {
				title: "Practice Questions - Start Learning",
				description:
					"Revise and retain your learning with Lisa AI's Practice Questions. Test your knowledge on recently learned topics. Start revising with Lisa AI today.",
			}
		case "chat":
			return {
				title: "1:1 CHAT - AI chat with lisa",
				description:
					"Interact with our AI-driven chat system for a unique learning experience. Unleash the power of personalized education at no-cost with our advanced Lisa AI!",
			}
		default:
			return {
				title: "Topic - Start Learning",
				description:
					"Begin on your learning journey with Lisa AI. Click to open this topic and learn in interactive and engaging way with interactive chat, resources, practise questions and more.Stat learning with Lisa AI now!",
			}
	}
}

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
	searchParams,
}: Props): Promise<Metadata> {
	const { tab } = searchParams
	const { title, description } = getMetaInfo(tab ?? "all")

	return {
		title,
		description,
	}
}

const Resources: React.FC<IHierarchySlugs> = async ({
	params: { courseId, topicId },
	searchParams,
}) => {
	const resources = await getResources({ courseId, topicId })
	return (
		<>
			<div className="flex w-full flex-col gap-x-2 gap-y-4 px-4">
				{resources.map(resource => (
					<LinkPreview
						key={resource.title}
						resource={resource}
					/>
				))}
			</div>
		</>
	)
}

export default Resources
