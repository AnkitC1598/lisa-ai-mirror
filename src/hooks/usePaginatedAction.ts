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
	refetch: any
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
				page,
				limit,
				...meta,
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

	const refetch = async ({ meta }: Record<string, any>) => {
		setLoading(true)
		setData([])
		try {
			setPage(1)
			const { data: newData, pagination } = await action({
				page: 1,
				limit,
				...meta,
			})
			setData(newData)
			setHasNextPage(pagination.next !== null)
		} catch (error) {
			console.error(`🚀 ~ refetch ~ error:`, error)
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!loading) fetchMore()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { data, loading, error, fetchMore, hasNextPage, refetch }
}

export default usePaginatedAction
