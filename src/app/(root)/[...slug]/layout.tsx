"use client"

import { getCourse } from "@/actions/hierarchy"
import useAIStore from "@/store"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"

interface ISlugLayout {
	children: React.ReactElement<ChildProps> | React.ReactElement<ChildProps>[]
}

interface ChildProps {
	currentView: string
}

const SlugLayout: React.FC<Readonly<ISlugLayout>> = ({ children }) => {
	const params = useParams<{ slug: string[] }>()
	const { slug } = params

	const dispatch = useAIStore(store => store.dispatch)

	useEffect(() => {
		getCourse({ cohortId: slug[0] }).then(course => {
			dispatch({
				type: "SET_STATE",
				payload: {
					currentHierarchy: course.type.map(t => t[0]).join(""),
				},
			})
		})
	}, [dispatch, slug])

	return children
}

export default SlugLayout
