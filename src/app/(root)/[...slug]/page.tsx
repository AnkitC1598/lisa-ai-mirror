import icon from "@/app/favicon.ico"
import HierarchyList from "@/components/organisms/HierarchyList"
import Search from "@/components/organisms/Search"
import { sleep } from "@/lib"
import Image from "next/image"
import { Suspense } from "react"

interface IHierarchySlugs {
	params: {
		slug: string
	}
	searchParams: {
		query: string
	}
}

const getHierarchyData = async () => {
	// const cookieStore = cookies()
	// const theme = cookieStore.get("theme")
	// const resp = await fetch("")
	// if (!resp.ok) throw new Error("Failed to fetch courses")

	// return resp.json()
	await sleep(2000)
	return []
}

const HierarchySlugs: React.FC<IHierarchySlugs> = ({ searchParams }) => {
	const query = searchParams?.query || ""
	return (
		<>
			<div className="flex flex-col gap-4 p-4">
				<div className="flex gap-4">
					<div className="relative h-14 w-14 shrink-0 rounded-md ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800">
						<Image
							src={icon}
							alt="icon"
							fill
						/>
					</div>
					<p className="line-clamp-2 text-lg font-medium">Title</p>
				</div>
				<Search />
				<Suspense fallback={<>Loading...</>}>
					<HierarchyList query={query} />
				</Suspense>
			</div>
		</>
	)
}

export default HierarchySlugs
