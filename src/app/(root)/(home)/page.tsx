import {
	getCourses,
	getRecentTopics,
	getSuggestedTopics,
} from "@/actions/hierarchy"
import CourseList from "@/components/organisms/CourseList"
import HierarchyCard from "@/components/organisms/HierarchyCard"
import PageTransitionProvider from "@/providers/pageTransitionProvider"

const Home = async () => {
	const courses = await getCourses()
	const recent = await getRecentTopics()
	const suggestedTopics = await getSuggestedTopics()

	return (
		<>
			<PageTransitionProvider>
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
					{suggestedTopics.length ? (
						<div className="flex flex-col gap-4 p-4 pt-0">
							<div className="text-base font-medium">
								Suggested topics
							</div>
							{suggestedTopics.map(suggested => (
								<HierarchyCard
									key={suggested._id}
									type="topic"
									showHierarchy
									hierarchy={suggested}
									cohortId={suggested.cohortId}
								/>
							))}
						</div>
					) : null}
				</div>
			</PageTransitionProvider>
		</>
	)
}

export default Home
