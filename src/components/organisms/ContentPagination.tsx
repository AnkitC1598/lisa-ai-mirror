import { cn } from "@/lib/utils"

interface IContentPagination {
	vertical?: boolean
	slideState: {
		current: number
		finished: number[]
	}
	total: number
}

const ContentPagination: React.FC<IContentPagination> = ({
	vertical = false,
	slideState,
	total = 0,
}) => {
	return (
		<>
			<div
				className={cn(
					"flex flex-nowrap gap-2 p-4",
					vertical
						? "flex-col justify-center pb-8 pl-2 pr-1 pt-4"
						: ""
				)}
			>
				{Array.from({ length: total }).map((_, i) => (
					<div
						key={i}
						className={cn(
							"flex rounded-full bg-neutral-200 dark:bg-neutral-700",
							vertical ? "w-2 flex-1" : "h-2 flex-1",
							slideState.finished.includes(i)
								? "border border-green-400 bg-green-500 dark:border-emerald-600 dark:bg-emerald-600"
								: "",
							slideState.current === i
								? "border border-emerald-600 dark:border-emerald-500"
								: ""
						)}
					></div>
				))}
			</div>
		</>
	)
}

export default ContentPagination
