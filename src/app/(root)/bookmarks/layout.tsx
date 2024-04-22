import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Bookmarks",
	description:
		"Access your saved content on Lisa AI's Bookmarks page. Revisit your bookmarked topics, resources or modules and continue learning at your own pace. Click to view your bookmarks now!",
	openGraph: {
		title: "Bookmarks",
		description:
			"Access your saved content on Lisa AI's Bookmarks page. Revisit your bookmarked topics, resources or modules and continue learning at your own pace. Click to view your bookmarks now!",
	},
	twitter: {
		title: "Bookmarks",
		description:
			"Access your saved content on Lisa AI's Bookmarks page. Revisit your bookmarked topics, resources or modules and continue learning at your own pace. Click to view your bookmarks now!",
	},
}

const BookmarksLayout = ({ children }: { children: React.ReactNode }) =>
	children

export default BookmarksLayout
