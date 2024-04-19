import { ISVGIconProps } from "@/types/svg"
import React from "react"

interface ILoadingProps {
	text?: string
	icon: React.ComponentType<ISVGIconProps> | null
}

const Placeholder: React.FC<ILoadingProps> = ({
	icon: IconComponent,
	text = "",
}) => {
	return (
		<div className="flex flex-col items-center justify-center gap-3 px-4 text-neutral-300 dark:text-neutral-700">
			{IconComponent ? <IconComponent className="h-10 w-10" /> : null}
			<p className="text-lg leading-6 text-neutral-400 dark:text-neutral-600">
				{text}
			</p>
		</div>
	)
}

export default Placeholder
