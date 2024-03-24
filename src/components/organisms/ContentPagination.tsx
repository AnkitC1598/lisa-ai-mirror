const ContentPagination = () => {
	return (
		<>
			<div className="flex flex-nowrap gap-2 p-4">
				{Array.from({ length: 10 }, (_, i) => i + 1).map(i => (
					<div
						key={i}
						className="flex h-2 flex-1 rounded-full bg-green-200 ring-1 ring-inset ring-green-300 dark:bg-green-600/50 dark:ring-green-500"
					>
						<div className="flex w-full items-center justify-center rounded-full bg-green-600 font-medium leading-none text-slate-200 dark:bg-green-400 dark:text-slate-900" />
					</div>
				))}
			</div>
		</>
	)
}

export default ContentPagination
