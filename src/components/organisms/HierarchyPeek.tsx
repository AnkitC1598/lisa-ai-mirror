import logo from "@/app/favicon.ico"
import Peek from "@/svg/peek"
import Image from "next/image"
import React from "react"

interface IHierarchyPeek {
	peekIndex: number
}

const HierarchyPeek: React.FC<IHierarchyPeek> = ({ peekIndex }) => {
	return (
		<>
			<div
				className="absolute inset-x-0 -top-6 flex -space-x-6 overflow-y-auto scrollbar-hide"
				style={{ zIndex: peekIndex + 9 }}
			>
				<div
					className="relative top-[0.125rem] mr-6 h-8 w-8 rounded-md bg-purple-100 ring-1 ring-inset ring-purple-300 dark:bg-purple-900 dark:ring-purple-600"
					style={{
						zIndex: peekIndex + 10 + -1 * 1,
					}}
				>
					<span className="absolute inset-x-0 bottom-3 m-auto flex h-1/2 w-1/2 items-center justify-start text-xs">
						<div className="relative h-full w-full">
							<Image
								src={logo}
								alt="icon"
								fill
							/>
						</div>
					</span>
				</div>
				{Array.from({
					length: 2,
				}).map((_, idx) => (
					<div
						key={idx}
						className="relative h-full"
						style={{
							zIndex: peekIndex + 10 + -1 * (idx + 2),
						}}
					>
						<Peek
							border="stroke-purple-300 dark:stroke-purple-600"
							bg="fill-purple-100 dark:fill-purple-900"
							className="!h-8 !w-32"
							style={{
								zIndex: peekIndex + 10 + -1 * (idx + 2),
							}}
						/>
						<span className="absolute inset-x-0 bottom-3 flex items-center justify-start pl-4 pr-8 text-xs">
							<span className="truncate">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit
							</span>
						</span>
					</div>
				))}
			</div>
		</>
	)
}

export default HierarchyPeek
