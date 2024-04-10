import { Skeleton } from "@/components/ui/skeleton"

const Loader = () => {
	return (
		<div className="flex h-full flex-col gap-4 overflow-y-auto overflow-x-hidden scrollbar">
			<div className="p-4 pb-0 text-base font-medium">Your Courses</div>
			<div className="flex w-full items-center justify-center px-4">
				<Skeleton className="h-16 w-full" />
			</div>
			<div className="flex flex-col gap-4 p-4">
				<div className="text-base font-medium">Continue Learning</div>
				<Skeleton className="h-12 w-full" />
			</div>
		</div>
	)
}

export default Loader
