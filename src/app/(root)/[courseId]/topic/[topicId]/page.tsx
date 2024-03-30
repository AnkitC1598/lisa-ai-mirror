import ContentControls from "@/components/organisms/ContentControls"
import Slides from "@/components/organisms/Slides"

const TopicContent = () => {
	return (
		<div className="flex h-full flex-col gap-4">
			<ContentControls />
			<Slides />
		</div>
	)
}

export default TopicContent
