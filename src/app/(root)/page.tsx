import { getCourses, getRecentTopics } from "@/actions/hierarchy"
import CourseList from "@/components/organisms/CourseList"
import HierarchyCard from "@/components/organisms/HierarchyCard"

const Home = async () => {
	const courses = await getCourses()
	const recent = await getRecentTopics()

	return (
		<>
			<div className="flex h-full flex-col gap-8 overflow-y-auto overflow-x-hidden p-4 scrollbar">
				<div className="flex flex-col gap-5">
					<div className="text-xl font-bold">Your Courses</div>
					<CourseList courses={courses} />
				</div>
				{recent ? (
					<div className="flex flex-col gap-5">
						<div className="text-xl font-bold">
							Continue Learning
						</div>
						<HierarchyCard
							key={recent._id}
							type="topic"
							showHierarchy
							hierarchy={recent}
							cohortId={recent.cohortId}
						/>
					</div>
				) : null}
				{/* <div className="flex flex-col gap-5">
					<div className="text-xl font-bold">Suggested Topics</div>
					<HierarchyCard
						type="topic"
						showHierarchy
					/>
					<HierarchyCard
						type="topic"
						showHierarchy
					/>
				</div> */}
			</div>
		</>
	)
}

export default Home
