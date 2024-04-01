import { getCourses } from "@/actions/hierarchy"
import CourseList from "@/components/organisms/CourseList"

const Home = async () => {
	const courses = await getCourses()

	return (
		<>
			<div className="flex h-full flex-col gap-8 overflow-y-auto overflow-x-hidden p-4 scrollbar">
				<div className="flex flex-col gap-5">
					<div className="text-xl font-bold">Your Courses</div>
					<CourseList courses={courses} />
				</div>
				{/* <div className="flex flex-col gap-5">
					<div className="text-xl font-bold">Continue Learning</div>
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
				</div> */}
			</div>
		</>
	)
}

export default Home
