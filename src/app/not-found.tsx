import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Lisa AI - 404 Error - Page does not exist",
	description:
		"Oops! The page you’re looking for doesn’t exist. But don’t worry, Lisa AI is here to guide you to be back on track. Simply click ‘Back-to-Dashboard’ to begin learning.",
}

export default function NotFound() {
	return (
		<div className="relative flex h-full w-full flex-col items-center justify-center gap-2 px-12 py-8 text-center text-gray-900 dark:text-gray-50">
			<div className="z-10 flex flex-col items-center justify-center gap-16 px-6">
				<div className="flex flex-col items-center justify-center gap-2">
					<div className="text-6xl font-extrabold leading-none">
						404
					</div>
					<div className="text-lg font-bold leading-7">
						Oops! looks like you&apos;ve wandered out of syllabus
					</div>
					<div className="text-xs font-normal leading-5 text-gray-700 dark:text-gray-200">
						This page isn&apos;t available. Kindly return to the
						dashboard to resume learning
					</div>
				</div>

				<Button
					asChild
					variant="outline"
					className={
						"w-full border border-purple-100 bg-purple-600 text-neutral-50 hover:bg-purple-500/90 hover:text-neutral-50 dark:border-purple-100 dark:bg-purple-600 dark:text-neutral-50 dark:hover:bg-purple-500/90"
					}
				>
					<Link href="/">Back to homepage</Link>
				</Button>
			</div>
		</div>
	)
}
