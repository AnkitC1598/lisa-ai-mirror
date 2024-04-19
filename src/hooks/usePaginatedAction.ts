import { useEffect, useState } from "react"

interface IusePaginatedActionProps {
	limit?: number
	action: any
	meta?: Record<string, any>
}

interface IusePaginatedAction {
	data: any
	loading: boolean
	error: null | Error | any
	fetchMore: any
	hasNextPage: boolean
}

const usePaginatedAction = ({
	limit = 10,
	action,
	meta,
}: IusePaginatedActionProps): IusePaginatedAction => {
	const [page, setPage] = useState(1)
	const [data, setData] = useState<any>([])
	const [hasNextPage, setHasNextPage] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<null | Error | any>(null)

	const fetchMore = async () => {
		setLoading(true)
		try {
			const { data: newData, pagination } = await action({
				...meta,
				page,
				limit,
			})
			setData((prev: any) => [...prev, ...newData])
			setPage(page + 1)
			setHasNextPage(pagination.next !== null)
		} catch (error) {
			console.error(`🚀 ~ fetchMore ~ error:`, error)
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!loading) fetchMore()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { data, loading, error, fetchMore, hasNextPage }
}

export default usePaginatedAction
