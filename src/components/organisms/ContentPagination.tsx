// @ts-nocheck

import { cn } from "@/lib/utils"

interface IContentPagination {
	vertical?: boolean
	slideState: {
		currentPage: number
		finished: [] | number[]
	}
	total: number
}

const ContentPagination: React.FC<IContentPagination> = ({
	vertical = false,
	slideState = {},
	total = 0,
}) => {
	return (
		<>
			<div
				className={cn(
					"flex flex-nowrap gap-2 p-4",
					vertical ? "flex-col justify-center p-2 pr-1" : ""
				)}
			>
				{Array.from({ length: total }, (_, i) => i).map(i => (
					<div
						key={i}
						className={cn(
							"flex rounded-full ring-2 ring-inset ring-neutral-500/10 dark:ring-neutral-400/20",
							vertical ? "w-2 flex-1" : "h-2 flex-1",
							slideState.current === i
								? "ring-green-300 dark:ring-green-900"
								: "",
							slideState.finished.includes(i)
								? "bg-green-600 dark:bg-green-400"
								: ""
						)}
					></div>
				))}
			</div>
		</>
	)
}

export default ContentPagination
