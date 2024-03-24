import { sleep } from "@/lib"
import CourseCard from "./CourseCard"

const getCourses = async () => {
	// const cookieStore = cookies()
	// const theme = cookieStore.get("theme")
	// const resp = await fetch("")
	// if (!resp.ok) throw new Error("Failed to fetch courses")

	// return resp.json()
	await sleep(2000)
	return []
}

const CourseList = async () => {
	const courses: any[] = await getCourses()

	return (
		<>
			{courses.length ? (
				courses.map(course => (
					<CourseCard
						key={course._id}
						course={course}
					/>
				))
			) : (
				<CourseCard />
			)}
		</>
	)
}

export default CourseList
