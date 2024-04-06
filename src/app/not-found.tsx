import Link from "next/link"

export default function NotFound() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2 py-8">
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href="/">Return Home</Link>
		</div>
	)
}
