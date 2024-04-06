export const transition = {
	type: "spring",
	stiffness: 260,
	damping: 20,
	duration: 0.5,
}

export const pageTransitionConfig = {
	initialState: { x: 15, opacity: 0, transition },
	animateState: { x: 0, opacity: 1, transition },
	exitState: { x: -15, opacity: 0, transition },
}
