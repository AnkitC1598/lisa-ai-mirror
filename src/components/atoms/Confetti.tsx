import { MutableRefObject, useImperativeHandle, useState } from "react"
import Realistic from "react-canvas-confetti/dist/presets/realistic"
import type { TConductorInstance } from "react-canvas-confetti/dist/types"

interface ConfettiProps {
	forwardedRef: MutableRefObject<{ run: () => void } | undefined>
}

const Confetti: React.FC<ConfettiProps> = ({ forwardedRef }) => {
	const [conductor, setConductor] = useState<TConductorInstance | null>(null)

	useImperativeHandle(forwardedRef, () => ({
		run: () => {
			if (conductor) conductor.run({ speed: 1, duration: 7 })
		},
	}))

	const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
		setConductor(conductor)
	}

	return (
		<Realistic
			onInit={onInit}
			decorateOptions={options => ({
				...options,
				particleCount: 25,
				spread: 45,
				origin: {
					x: 0.5,
					y: 0.85,
				},
				disableForReducedMotion: true,
			})}
		/>
	)
}

export default Confetti
