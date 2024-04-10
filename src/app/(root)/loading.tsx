import Loading from "@/components/atoms/Loading"

const Loader = () => {
	return (
		<div className="flex h-full w-full items-center justify-center py-8">
			<Loading icon />
		</div>
	)
}

export default Loader
