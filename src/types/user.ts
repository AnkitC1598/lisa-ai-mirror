export interface IUserOnboarding {
	gender: string
	yob: number
	location: {
		country: string
		city: string
	}
	interests: {
		creativity: string[]
		goingOut: string[]
		stayingIn: string[]
		filmTv: string[]
		reading: string[]
		music: string[]
		foodDrinking: string[]
		traveling: string[]
		pets: string[]
		valuesTraits: string[]
	}
}

export interface IFormUser extends IUserOnboarding {
	firstname: string
	lastname: string
	dob: string
	email: string
	mobile: {
		countryCode: string
		phoneNumber: number
	}
	username: string
	description: string
	profileImage: string
	coverImage: string
	socials: {
		github: string
		instagram: string
		linkedIn: string
		twitter: string
	}
}

export interface IUser extends IFormUser {
	_id: string
	uid: string
	createdAt: string
	updatedAt: string
	fullname: string
	mobile: {
		countryCode: string
		phoneNumber: number
		numberWithCountryCode: string
	}
	highestQualification: any | null
	specialization: any | null
	strongSubject: any | null
	status: string
	interestsAdded: boolean
	preferences: {
		hobbies: any[]
		musicGenre: any[]
		foodName: any[]
		movieGenre: {
			_id: number
			value: string
			label: string
		}[]
		movieName: any | null
		profession: any | null
		favouriteSport: any[]
	}
	lastLoginAt: string
}
