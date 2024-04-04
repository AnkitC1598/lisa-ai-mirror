// @ts-nocheck
import { useCallback, useEffect, useRef } from "react"

const useConfetti = ({ origin = { y: 1 } }) => {
	const confettiInstance = useRef()

	const getConfettiInstance = useCallback(instance => {
		confettiInstance.current = instance
	}, [])

	const makeShot = useCallback(
		(particleRatio, opts) => {
			confettiInstance.current &&
				confettiInstance.current({
					...opts,
					origin,
					particleCount: Math.floor(200 * particleRatio),
				})
		},
		[origin]
	)

	const fire = useCallback(() => {
		makeShot(0.25, {
			spread: 26,
			startVelocity: 55,
		})

		makeShot(0.2, {
			spread: 60,
		})

		makeShot(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8,
		})

		makeShot(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2,
		})

		makeShot(0.1, {
			spread: 120,
			startVelocity: 45,
		})
	}, [makeShot])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => (window.fireConfetti = fire), [])

	return { getConfettiInstance, fire, makeShot }
}

export default useConfetti
