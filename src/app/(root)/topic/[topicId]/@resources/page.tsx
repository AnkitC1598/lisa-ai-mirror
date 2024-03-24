import LinkPreview from "@/components/organisms/LinkPreview"

const Resources = () => {
	return (
		<>
			<div className="flex w-full flex-wrap gap-x-2 gap-y-4 px-4">
				<LinkPreview orientation="landscape" />
				<LinkPreview orientation="portrait" />
				<LinkPreview orientation="portrait" />
				<LinkPreview orientation="landscape" />
				<LinkPreview orientation="portrait" />
				<LinkPreview orientation="portrait" />
				<LinkPreview orientation="landscape" />
				<LinkPreview orientation="portrait" />
				<LinkPreview orientation="portrait" />
			</div>
		</>
	)
}

export default Resources
