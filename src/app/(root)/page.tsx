import CourseList from "@/components/organisms/CourseList"
import SearchMenu from "@/components/organisms/SearchMenu"
import { Suspense } from "react"

const Home = () => {
	return (
		<>
			<div className="flex flex-col gap-8 p-4">
				<SearchMenu size="large" />
				<div className="flex flex-col gap-5">
					<div className="text-xl font-bold">Courses</div>
					<Suspense fallback={<>Loading...</>}>
						<CourseList />
					</Suspense>
				</div>
			</div>
		</>
	)
}

export default Home
