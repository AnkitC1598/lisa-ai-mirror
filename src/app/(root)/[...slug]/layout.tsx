"use client"

import { getCourse } from "@/actions/hierarchy"
import useAIStore from "@/store"
import { notFound, useParams } from "next/navigation"
import React, { useEffect } from "react"

const objectIdPattern = /^[0-9a-fA-F]{24}$/

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
		if (objectIdPattern.test(slug[0]))
			getCourse({ cohortId: slug[0] }).then(course => {
				dispatch({
					type: "SET_STATE",
					payload: {
						currentHierarchy: course.type.map(t => t[0]).join(""),
					},
				})
			})
		else notFound()
	}, [dispatch, slug])

	return children
}

export default SlugLayout
