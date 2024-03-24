"use client"

import { getType } from "@/lib"
import useAIStore from "@/store"
import { useParams, usePathname } from "next/navigation"
import { useMemo } from "react"

interface IHierarchy {
	prevLevel: ILevel
	currentLevel: ILevel
	ids: Record<string, string | null>
	currentView: string
	nextView: string | null
	idx: number
	hierarchyArr: string[]
	slug: string | string[] | undefined
	currentHierarchy: string | null
}

interface ILevel {
	idType: string | null
	id: string | null
}

const hierarchyTypes: Record<string, string[]> = {
	ctsct: ["term", "subject", "chapter"],
	csct: ["subject", "chapter"],
	cst: ["subject"],
	ct: [],
}

const useGetHierarchy = (): IHierarchy => {
	const pathname = usePathname()
	const params = useParams<{ slug: string[] }>()
	const { slug } = params
	const currentHierarchy = useAIStore(store => store.currentHierarchy)

	const hierarchy = useMemo(() => {
		const ids: Record<string, string | null> = {}
		const currentLevel: ILevel = { idType: null, id: null }
		const prevLevel: ILevel = { idType: null, id: null }
		let idx: number = 0
		let hierarchyArr: string[] = []
		let currentView: string = "course"
		let nextView: string | null = null

		if (currentHierarchy && getType(slug) === "Array" && slug.length) {
			const lastType = ["topic", "explanation"]
			hierarchyArr = Array.from(
				new Set([
					currentView,
					...hierarchyTypes[currentHierarchy],
					...lastType,
				])
			)

			hierarchyArr.forEach((h, hIdx) => {
				if (["assignment", "topic"].includes(h)) h = "session"
				ids[`${h}Id`] = slug[hIdx] ?? null
			})
			Object.keys(ids).forEach(id => {
				if (ids[id] === null) delete ids[id]
			})

			idx = slug ? slug.length - 1 : 0

			currentView = hierarchyArr[idx + 1] ?? hierarchyArr.at(-1)
			nextView = hierarchyArr[idx + 2] ?? null
			currentLevel.idType = hierarchyArr[idx]
			currentLevel.id = slug[idx]
			prevLevel.idType = hierarchyArr[idx - 1] ?? currentLevel.idType
			prevLevel.id = slug[idx - 1] ?? currentLevel.id
		}

		const h: IHierarchy = {
			prevLevel,
			currentLevel,
			ids,
			currentView,
			nextView,
			idx,
			hierarchyArr,
			slug,
			currentHierarchy,
		}
		if (typeof window !== "undefined") (window as any).hierarchy = h

		return h
	}, [currentHierarchy, slug])

	return hierarchy
}

export default useGetHierarchy
