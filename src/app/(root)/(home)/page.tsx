import {
	getCourses,
	getRecentTopics,
	getSuggestedTopics,
} from "@/actions/hierarchy"
import CourseList from "@/components/organisms/CourseList"
import HierarchyCard from "@/components/organisms/HierarchyCard"
import PageTransitionProvider from "@/providers/pageTransitionProvider"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Dashboard - Begin Learning",
	description:
		"Dive into learning with Lisa AI Dashboard. Start exploring all courses tailored to your learning style. Click a course or topuc to begin your learning journey today!",
	openGraph: {
		title: "Dashboard - Begin Learning",
		description:
			"Dive into learning with Lisa AI Dashboard. Start exploring all courses tailored to your learning style. Click a course or topuc to begin your learning journey today!",
	},
	twitter: {
		title: "Dashboard - Begin Learning",
		description:
			"Dive into learning with Lisa AI Dashboard. Start exploring all courses tailored to your learning style. Click a course or topuc to begin your learning journey today!",
	},
}

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
								key={recent._id + "-recent"}
								type="topic"
								showHierarchy
								hierarchy={recent}
								cohortId={recent.cohortId}
								from="recent"
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
									key={suggested._id + "-suggested"}
									type="topic"
									showHierarchy
									hierarchy={suggested}
									cohortId={suggested.cohortId}
									from="suggestion"
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
