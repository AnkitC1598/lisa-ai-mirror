import { getCourse } from "@/actions/hierarchy"
import { getHierarchyMetaData } from "@/lib/metadata"
import { Metadata } from "next"
import React from "react"
import GetCourseLayout from "./GetCourseLayout"

interface ISlugLayout {
	children: React.ReactElement | React.ReactElement[]
}

export async function generateMetadata({
	params: { slug },
}: {
	params: {
		slug: string[]
	}
}): Promise<Metadata> {
	const {
		type,
	}: {
		type: string[]
	} = await getCourse({ cohortId: slug[0] })

	return getHierarchyMetaData(type[slug.length])
}

const SlugLayout: React.FC<Readonly<ISlugLayout>> = ({ children }) => {
	return <GetCourseLayout>{children}</GetCourseLayout>
}

export default SlugLayout
