// "use client"

// import { getHierarchyData } from "@/actions/hierarchy"
import { fetchClientWithToken } from "@/services/fetch"
import { THierarchyType } from "@/types/hierarchy"

interface IHierarchyList {
	query: string
	currentView: THierarchyType
	cohortId: string
	idType: string
	id: string
}

// const cachedGetHierarchyData = cache(getHierarchyData)

const getHierarchyData = async ({
	hierarchy,
	cohortId,
	idType,
	id,
	query,
}: {
	hierarchy: string
	cohortId: string
	idType: string
	id: string
	query: string
}) => {
	const resp = await fetchClientWithToken(
		`/cohort/${cohortId}/${hierarchy}s?id=${id}&idType=${idType}`,
		{
			method: "GET",
		}
	)

	return resp.results.data
}

const HierarchyList: React.FC<IHierarchyList> = async ({
	query,
	currentView,
	cohortId,
	idType,
	id,
}) => {
	// const hierarchyData = await getHierarchyData({
	// 	query,
	// 	hierarchy: currentView,
	// 	cohortId,
	// 	idType,
	// 	id,
	// })
	// console.debug(`🚀 ~ hierarchyData:`, hierarchyData, {
	// 	query,
	// 	hierarchy: currentView,
	// 	cohortId,
	// 	idType,
	// 	id,
	// })

	// const [hierarchyData, setHierarchyData] = useState(null)

	// useEffect(() => {
	// 	getHierarchyData({
	// 		query,
	// 		hierarchy: currentView,
	// 		cohortId,
	// 		idType,
	// 		id,
	// 	}).then(resp => setHierarchyData(resp))
	// }, [cohortId, currentView, id, idType, query])

	// console.log(hierarchyData)

	// useEffect(() => {
	console.log({ query })
	// }, [query])

	// useEffect(() => {
	console.log({ currentView })
	// }, [currentView])

	// useEffect(() => {
	console.log({ cohortId })
	// }, [cohortId])

	// useEffect(() => {
	console.log({ idType })
	// }, [idType])

	// useEffect(() => {
	console.log({ id })
	// }, [id])

	return (
		<>
			{/* {hierarchyData.length ? (
				hierarchyData.map(hierarchy => (
					<HierarchyCard key={hierarchy._id} />
				))
			) : (
				<HierarchyCard />
			)} */}
		</>
	)
}

export default HierarchyList
