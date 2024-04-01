export interface IFormUser {
	firstname: string
	lastname: string
	email: string
	mobile: {
		countryCode: string
		phoneNumber: number
	}
	username: string
	description: string
	profileImage: string
	coverImage: string
	gender: string
	dob: string
	location: {
		country: string
		city: string
	}
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
