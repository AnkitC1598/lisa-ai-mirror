import icon from "@/app/favicon.ico"
import Image from "next/image"
import Link from "next/link"

const CourseCard: React.FC<any> = ({ course }) => {
	return (
		<>
			<Link
				href="/659bb61609fbd38e9a81e0c6"
				className="flex gap-4 rounded-md p-4 shadow ring-1 ring-inset ring-neutral-200 dark:shadow-neutral-800 dark:ring-neutral-800"
			>
				<div className="relative h-14 w-14 shrink-0 rounded-md ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800">
					<Image
						src={icon}
						alt="icon"
						fill
					/>
				</div>
				<p className="line-clamp-2 text-lg font-medium">Title</p>
			</Link>
		</>
	)
}

export default CourseCard
