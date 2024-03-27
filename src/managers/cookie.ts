import Cookies from "js-cookie"

/**
 * Manages cookies using the `js-cookie` library and provides methods for accessing, updating, and observing changes to cookies.
 * @class
 */
class CookieManager {
	private readonly cookieKeys: { [key: string]: string }
	private readonly cookieOptions: Cookies.CookieAttributes
	private readonly wildCardCookieOptions: Cookies.CookieAttributes
	private readonly observers: { [key: string]: Function[] }
	private readonly channel: BroadcastChannel

	/**
	 * Creates an instance of CookieManager.
	 * @constructor
	 */
	constructor() {
		// Check if the code is running in the browser and if the hostname includes "localhost"
		const isLocalHost: boolean = process.browser
			? window.location.hostname.includes("localhost")
			: true

		// Determine the cookie key based on the environment variable or the hostname
		const COOKIE_KEY: string =
			process.env.NEXT_PUBLIC_COOKIE_KEY ||
			(isLocalHost
				? "lisa"
				: this.cookieKeyForDomain(window.location.hostname))

		// Determine the domain to be used for the cookies based on the current environment
		const domain: string = isLocalHost
			? "localhost" // For localhost environment, use "localhost" as the domain
			: window.location.hostname // For other environments, use hostname

		let wildCardDomain: string | undefined
		if (!isLocalHost) {
			const parts: string[] = domain.split(".")
			if (parts.length > 2) {
				wildCardDomain = "." + parts.slice(-2).join(".")
			} else {
				wildCardDomain = "." + domain
			}
		}

		// Define the cookie names with the given key as a prefix
		this.cookieKeys = {
			basicAccess: `${COOKIE_KEY}_basic_access`,
			access: `${COOKIE_KEY}_access`,
			refresh: `${COOKIE_KEY}_refresh`,
		}

		// Define the options to be used for the cookies
		this.cookieOptions = {
			path: "/",
			expires: 1, // Set cookies to expire after 1 day
		}
		this.wildCardCookieOptions = {
			domain: wildCardDomain,
			...this.cookieOptions,
		}

		// Initialize an object to store observers for cookie changes
		this.observers = {}

		this.channel = new BroadcastChannel("cookieUpdates")
		this.channel.onmessage = (event: MessageEvent) => {
			const { cookieKey, value, conditions } = event.data
			this.notify(cookieKey, value, conditions, true)
		}
	}

	/**
	 * Subscribes to changes in a specific cookie.
	 * @param {string} key - The key of the cookie to subscribe to.
	 * @param {Function} callback - The callback function to be called on changes.
	 * @returns {Function} - A function to unsubscribe from changes in the specified cookie.
	 */
	public subscribe(key: string, callback: Function): () => void {
		const cookieKey: string = this.cookieKeys[key]

		if (!this.observers[cookieKey]) {
			this.observers[cookieKey] = []
		}

		this.observers[cookieKey].push(callback)

		// Return a function to unsubscribe from changes in a specific cookie
		return () => {
			if (this.observers[cookieKey]) {
				this.observers[cookieKey] = this.observers[cookieKey].filter(
					observer => observer !== callback
				)
			}
		}
	}

	/**
	 * Notifies all subscribers when a cookie changes.
	 * @param {string} cookieKey - The key of the cookie that changed.
	 * @param {any} value - The new value of the cookie.
	 * @param {Object} [conditions={}] - Additional conditions related to the change.
	 * @param {boolean} [isBroadcasted=false] - Indicates whether the notification is from a broadcast.
	 */
	private notify(
		cookieKey: string,
		value: any,
		conditions: object = {},
		isBroadcasted: boolean = false
	): void {
		if (this.observers[cookieKey]) {
			this.observers[cookieKey].forEach(observer =>
				observer({
					value,
					conditions,
					isBroadcasted,
				})
			)
			if (!isBroadcasted)
				this.channel.postMessage({
					cookieKey,
					value,
					conditions,
					isBroadcasted,
				})
		}
	}

	/**
	 * Retrieves all cookies as an object.
	 * @returns {Object} - An object containing all cookies.
	 */
	public getAll(): { [key: string]: string } | null {
		return Cookies.get() || null
	}

	/**
	 * Retrieves the basic access token from the cookies.
	 * @returns {string|null} - The basic access token or null if not found.
	 */
	public getBasicAccessToken(): string | null {
		return Cookies.get(this.cookieKeys.basicAccess) || null
	}

	/**
	 * Updates the basic access token in the cookies.
	 * @param {string|null} token - The new basic access token or null to remove it.
	 */
	public updateBasicAccessToken(token: string | null = null): void {
		if (token) {
			const prev: string | null = this.getBasicAccessToken()
			Cookies.set(
				this.cookieKeys.basicAccess,
				token,
				this.wildCardCookieOptions
			)
			if (prev !== token)
				this.notify(this.cookieKeys.basicAccess, token, {
					fresh: prev === null,
					updated: prev === null ? false : true,
					reset: false,
				})
		}
	}

	/**
	 * Retrieves the access token from the cookies.
	 * @returns {string|null} - The access token or null if not found.
	 */
	public getAccessToken(): string | null {
		return Cookies.get(this.cookieKeys.access) || null
	}

	/**
	 * Updates the access token in the cookies.
	 * @param {string|null} token - The new access token or null to remove it.
	 */
	public updateAccessToken(token: string | null = null): void {
		if (token) {
			const prev: string | null = this.getAccessToken()
			Cookies.set(this.cookieKeys.access, token, this.cookieOptions)
			if (prev !== token)
				this.notify(this.cookieKeys.access, token, {
					fresh: prev === null,
					updated: prev === null ? false : true,
					reset: false,
				})
		}
	}

	/**
	 * Retrieves the refresh token from the cookies.
	 * @returns {string|null} - The refresh token or null if not found.
	 */
	public getRefreshToken(): string | null {
		return Cookies.get(this.cookieKeys.refresh) || null
	}

	/**
	 * Updates the refresh token in the cookies.
	 * @param {string|null} token - The new refresh token or null to remove it.
	 */
	public updateRefreshToken(token: string | null = null): void {
		if (token) {
			const prev: string | null = this.getRefreshToken()
			Cookies.set(this.cookieKeys.refresh, token, this.cookieOptions)
			if (prev !== token)
				this.notify(this.cookieKeys.refresh, token, {
					fresh: prev === null,
					updated: prev === null ? false : true,
					reset: false,
				})
		}
	}

	/**
	 * Retrieves both access and refresh tokens from the cookies.
	 * @returns {Object} - An object containing basic access, access, and refresh tokens.
	 */
	public getTokens(): { [key: string]: string | null } {
		return {
			basicAccessToken: this.getBasicAccessToken(),
			accessToken: this.getAccessToken(),
			refreshToken: this.getRefreshToken(),
		}
	}

	/**
	 * Sets all or any of the tokens provided in the cookies.
	 * @param {Object} tokens - An object containing token values.
	 * @param {string | null} [tokens.basicAccessToken=null] - The new basic access token. Set to null to remove it.
	 * @param {string | null} [tokens.accessToken=null] - The new access token. Set to null to remove it.
	 * @param {string | null} [tokens.refreshToken=null] - The new refresh token. Set to null to remove it.
	 */
	public setTokens({
		basicAccessToken = null,
		accessToken = null,
		refreshToken = null,
	}: {
		basicAccessToken?: string | null
		accessToken?: string | null
		refreshToken?: string | null
	}): void {
		this.updateBasicAccessToken(basicAccessToken)
		this.updateAccessToken(accessToken)
		this.updateRefreshToken(refreshToken)
	}

	/**
	 * Gets the value of a specific cookie from the provided cookies string.
	 * @param {string} key - The key of the cookie to retrieve.
	 * @param {string} cookies - The string containing all cookies.
	 * @returns {string} - The value of the specified cookie.
	 */
	public getServerCookie(key: string, cookies: string): string {
		const cookieString: RegExpExecArray | null = RegExp(
			key + "=[^;]+"
		).exec(cookies)
		return decodeURIComponent(
			!!cookieString ? cookieString.toString().replace(/^[^=]+./, "") : ""
		)
	}

	/**
	 * Removes both access and refresh tokens from the cookies.
	 */
	public removeTokens(): void {
		Cookies.remove(this.cookieKeys.basicAccess, this.wildCardCookieOptions)
		Cookies.remove(this.cookieKeys.access, this.cookieOptions)
		Cookies.remove(this.cookieKeys.refresh, this.cookieOptions)

		// Notify subscribers when tokens are removed
		this.notify(this.cookieKeys.basicAccess, null, {
			fresh: false,
			updated: false,
			reset: true,
		})
		this.notify(this.cookieKeys.access, null, {
			fresh: false,
			updated: false,
			reset: true,
		})
		this.notify(this.cookieKeys.refresh, null, {
			fresh: false,
			updated: false,
			reset: true,
		})
	}

	// Formats the domain by removing "www." and any subdomains to create a prefix for the COOKIE_KEY.
	private cookieKeyForDomain(hostname: string): string {
		const parts: string[] = hostname.split(".")

		// Check if it's a single-word domain
		if (parts.length === 2) return parts[0] // Return the domain as is

		// Remove the top-level domain (e.g., 'in', 'com', etc.)
		if (parts.length > 2) parts.pop()

		// Join the remaining parts with underscores and return the result
		return parts.join("_")
	}
}

export default CookieManager
