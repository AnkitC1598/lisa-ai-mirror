import { getCourses, getRecentTopics } from "@/actions/hierarchy"
import CourseList from "@/components/organisms/CourseList"
import HierarchyCard from "@/components/organisms/HierarchyCard"

const Home = async () => {
	const courses = await getCourses()
	const recent = await getRecentTopics()

	return (
		<>
			<div className="flex h-full flex-col gap-4 overflow-y-auto overflow-x-hidden scrollbar">
				<div className="flex flex-col gap-4">
					<div className="p-4 pb-0 text-base font-medium">
						Your Courses
					</div>
					<CourseList courses={courses} />
				</div>
				{recent ? (
					<div className="flex flex-col gap-4 p-4">
						<div className="text-base font-medium">
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
