export type Resource = {
	title: string
	url: string
	is_source_local: boolean
	is_source_both: boolean
	description: string
	profile: {
		name: string
		url: string
		long_name: string
		img: string
	}
	language: string
	family_friendly: boolean
	type: string
	subtype: string
	meta_url: {
		scheme: string
		netloc: string
		hostname: string
		favicon: string
		path: string
	}
	thumbnail:
		| {
				src: string
				original: string
				logo: boolean
		  }
		| undefined
}
