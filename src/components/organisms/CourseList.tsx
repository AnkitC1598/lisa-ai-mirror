"use client"

import icon from "@/app/favicon.ico"
import { cn } from "@/lib/utils"
import { ICourse } from "@/types/hierarchy"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from "../ui/carousel"

interface ICourseList {
	courses: ICourse[]
}

const CourseList: React.FC<ICourseList> = ({ courses }) => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!api) return

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])

	return (
		<>
			<div className="flex flex-col justify-center gap-2">
				<Carousel
					setApi={setApi}
					className="w-full"
					opts={{
						loop: true,
					}}
				>
					<CarouselContent
						className={cn(
							"-ml-2 pb-2",
							courses.length === 1
								? "px-4"
								: courses.length === 2
									? "mr-2 px-4"
									: ""
						)}
					>
						{courses.map(({ cohort: course }) =>
							course ? (
								<CarouselItem
									key={course._id}
									className={cn(
										"pl-2",
										courses.length > 2
											? "basis-11/12"
											: "basis-full"
									)}
								>
									<Link
										href={`/${course._id}`}
										className="flex gap-4 rounded-md bg-neutral-50 p-4 shadow ring-1 ring-inset ring-neutral-200 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-500/20"
									>
										<div className="relative h-10 w-10 shrink-0 rounded-md p-1 ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800">
											<div className="relative h-8 w-8 overflow-hidden rounded-md">
												<Image
													src={course.icon ?? icon}
													alt={course.title}
													fill
												/>
											</div>
										</div>
										<div className="flex items-center">
											<p className="line-clamp-2 text-sm">
												{course.title}
											</p>
										</div>
									</Link>
								</CarouselItem>
							) : null
						)}
					</CarouselContent>
				</Carousel>
				<div className="flex items-center justify-center gap-2">
					{Array.from({ length: count }).map((_, i) => (
						<span
							key={i}
							className={cn(
								"h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-800",
								current === i + 1
									? "h-2 w-2 bg-purple-400 dark:bg-purple-900"
									: "hover:cursor-pointer"
							)}
							onClick={() => api?.scrollTo(i)}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default CourseList
