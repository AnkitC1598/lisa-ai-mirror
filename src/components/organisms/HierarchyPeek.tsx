import logo from "@/app/favicon.ico"
import Peek from "@/svg/peek"
import Image from "next/image"
import React from "react"

interface IHierarchyPeek {
	peekIndex: number
	peekValue: {
		icon: string | null
		breadcrumbs: {
			color: { border: string; bg: string }
			title: string
			_id: string
		}[]
	}
}

const HierarchyPeek: React.FC<IHierarchyPeek> = ({ peekIndex, peekValue }) => {
	return (
		<>
			<div
				className="absolute inset-x-0 -top-6 flex -space-x-6 overflow-x-auto overflow-y-hidden scrollbar-hide"
				style={{ zIndex: peekIndex + 9 }}
			>
				<div
					className="relative -top-2 mr-6 h-full"
					style={{
						zIndex: peekIndex + 10 + -1 * 1,
					}}
				>
					<Peek
						border="stroke-neutral-300 dark:stroke-neutral-600"
						bg="fill-neutral-100 dark:fill-neutral-900"
						className="!h-8 !w-8 origin-top-left scale-125"
						style={{
							zIndex: peekIndex + 10 + -1 * 1,
						}}
						icon
					/>
					<span className="absolute inset-0 flex items-end justify-center text-xs">
						<div className="relative mb-0.5 h-4 w-4">
							<Image
								src={peekValue.icon ?? logo}
								alt="icon"
								fill
							/>
						</div>
					</span>
				</div>
				{peekValue.breadcrumbs.map((breadcrumb, idx) => (
					<div
						key={breadcrumb._id + "-hierarchy-peek-" + idx}
						className="relative h-full"
						style={{
							zIndex: peekIndex + 10 + -1 * (idx + 2),
						}}
					>
						<Peek
							border={
								breadcrumb.color.border ??
								"stroke-purple-300 dark:stroke-purple-600"
							}
							bg={
								breadcrumb.color.bg ??
								"fill-purple-100 dark:fill-purple-900"
							}
							className="!h-8 !w-32"
							style={{
								zIndex: peekIndex + 10 + -1 * (idx + 2),
							}}
						/>
						<span className="absolute inset-x-0 bottom-2.5 flex items-center justify-start pl-4 pr-8 text-xs">
							<span className="truncate">{breadcrumb.title}</span>
						</span>
					</div>
				))}
			</div>
		</>
	)
}

export default HierarchyPeek
