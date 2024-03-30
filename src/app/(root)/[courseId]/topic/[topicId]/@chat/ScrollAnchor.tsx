"use client"

import useAtBottom from "@/hooks/useAtBottom"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface IScrollAnchor {
	trackVisibility?: boolean
}

const ScrollAnchor: React.FC<IScrollAnchor> = ({ trackVisibility }) => {
	const isAtBottom = useAtBottom()
	const { ref, entry, inView } = useInView({
		trackVisibility,
		delay: 100,
		rootMargin: "0px 0px -50px 0px",
	})

	useEffect(() => {
		if (isAtBottom && trackVisibility && !inView) {
			entry?.target.scrollIntoView({
				block: "start",
			})
		}
	}, [inView, entry, isAtBottom, trackVisibility])

	return (
		<div
			ref={ref}
			className="h-px w-full"
		/>
	)
}

export default ScrollAnchor
