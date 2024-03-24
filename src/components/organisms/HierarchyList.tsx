import { sleep } from "@/lib"
import HierarchyCard from "./HierarchyCard"

const getHierarchyData = async ({ query }: { query: string }) => {
	// const cookieStore = cookies()
	// const theme = cookieStore.get("theme")
	// const resp = await fetch("")
	// if (!resp.ok) throw new Error("Failed to fetch hierarchyData")

	// return resp.json()
	await sleep(1000)
	return []
}

interface IHierarchyList {
	query: string
}

const HierarchyList: React.FC<IHierarchyList> = async ({ query }) => {
	const hierarchyData: any[] = await getHierarchyData({ query })

	return (
		<>
			{hierarchyData.length ? (
				hierarchyData.map(hierarchy => (
					<HierarchyCard key={hierarchy._id} />
				))
			) : (
				<HierarchyCard />
			)}
		</>
	)
}

export default HierarchyList
