export interface InterestCategory {
	icon: string | null
	label: string
	value: string
}

export type PreferenceMap = {
	Creativity: "creativity"
	"Going Out": "goingOut"
	"Staying In": "stayingIn"
	"Film & TV": "filmTv"
	Reading: "reading"
	Music: "music"
	"Food & Drink": "foodDrinking"
	Traveling: "traveling"
	Pets: "pets"
	"Values & Traits": "valuesTraits"
}

export type TPreferenceTitle = keyof PreferenceMap
export type TPreferenceKey = PreferenceMap[TPreferenceTitle]

export interface IPreference {
	title: TPreferenceTitle
	key: TPreferenceKey
	options: InterestCategory[]
}
