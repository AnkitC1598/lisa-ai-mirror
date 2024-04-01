import { getResources } from "@/actions/hierarchy"
import LinkPreview from "@/components/organisms/LinkPreview"

interface IHierarchySlugs {
	params: {
		courseId: string
		topicId: string
	}
	searchParams: {
		query: string
	}
}

const Resources: React.FC<IHierarchySlugs> = async ({
	params: { courseId, topicId },
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
