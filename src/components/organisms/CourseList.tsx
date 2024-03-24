"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from "../ui/carousel"
import CourseCard from "./CourseCard"

interface ICourseList {
	courses: any[]
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
					<CarouselContent className="-ml-2 pb-2">
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem
								key={index}
								className="basis-11/12 pl-2"
							>
								<CourseCard />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
				<div className="flex items-center justify-center gap-2">
					{Array.from({ length: count }).map((_, i) => (
						<span
							key={i}
							className={cn(
								"h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-800",
								current === i + 1
									? "h-2 w-2 bg-purple-300 dark:bg-purple-800"
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
