import CourseList from "@/components/organisms/CourseList"
import HierarchyCard from "@/components/organisms/HierarchyCard"
import { sleep } from "@/lib"

const getCourses = async () => {
	// const cookieStore = cookies()
	// const theme = cookieStore.get("theme")
	// const resp = await fetch("")
	// if (!resp.ok) throw new Error("Failed to fetch courses")

	// return resp.json()
	await sleep(2000)
	return []
}

const Home = async () => {
	const courses: any[] = await getCourses()
	return (
		<>
			<div className="flex h-full flex-col gap-8 overflow-y-auto overflow-x-hidden p-4 scrollbar">
				<div className="flex flex-col gap-5">
					<div className="text-xl font-bold">Your Courses</div>
					<CourseList courses={courses} />
				</div>
				<div className="flex flex-col gap-5">
					<div className="text-xl font-bold">Recent Topics</div>
					<HierarchyCard
						type="topic"
						showHierarchy={2}
					/>
				</div>
				<div className="flex flex-col gap-5">
					<div className="text-xl font-bold">Suggested Topics</div>
					<HierarchyCard
						type="topic"
						showHierarchy={2}
					/>
					<HierarchyCard
						type="topic"
						showHierarchy={2}
					/>
				</div>
			</div>
		</>
	)
}

export default Home
