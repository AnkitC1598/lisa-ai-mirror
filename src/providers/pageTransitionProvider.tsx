"use client"

import { pageTransitionConfig } from "@/constants/AnimationConfig"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

interface IPageTransitionProvider {
	children: React.ReactNode
}

const PageTransitionProvider: React.FC<Readonly<IPageTransitionProvider>> = ({
	children,
}) => {
	const pathname = usePathname()
	return (
		<>
			<AnimatePresence mode="wait">
				<motion.div
					key={pathname}
					initial="initialState"
					animate="animateState"
					exit="exitState"
					variants={pageTransitionConfig}
					className="h-full"
				>
					{children}
				</motion.div>
			</AnimatePresence>
		</>
	)
}

export default PageTransitionProvider
