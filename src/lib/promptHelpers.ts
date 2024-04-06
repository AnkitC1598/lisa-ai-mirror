export const getInterestStatements = (interest: string, value: string) => {
	switch (interest) {
		case "creativity":
			return `I like to do ${value}.`
		case "filmTv":
			return `I like to watch ${value} movies.`
		case "foodDrinking":
			return `I like to eat/drink ${value} food.`
		case "goingOut":
			return `I like to go out to ${value}.`
		case "music":
			return `I like listening to ${value} music.`
		case "pets":
			return `I like ${value} pets.`
		case "reading":
			return `I like to read ${value} books.`
		case "stayingIn":
			return `I like to stay in and ${value}.`
		case "traveling":
		case "travelling":
			return `I like to travel & go ${value}.`
		case "valueTraits":
			return `I value ${value}.`
		default:
			return `I like to ${value}.`
	}
}
