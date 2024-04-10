export const extractErrorFromStreamBody = async (
	body: ReadableStream<Uint8Array> | null
): Promise<
	| {
			name: string
			source: string
			message: string
			stack: string
	  }
	| string
> => {
	if (!body) return "Could not parse response body"

	let html = ""
	const reader = body.getReader()

	// Read the stream content
	while (true) {
		const { done, value } = await reader.read()
		if (done) break
		const unicodeValues: number[] = Array.from(value)
		const str: string = String.fromCharCode.apply(null, unicodeValues)
		html += str
	}
	console.log("html:", html)
	// Create a temporary div element to parse the HTML content
	const tempDiv = document.createElement("div")
	tempDiv.innerHTML = html

	console.log("html has __NEXT_DATA__", html.includes("__NEXT_DATA__"))

	// Find the script element by its unique id
	const scriptElement = tempDiv.querySelector("#__NEXT_DATA__")

	if (!scriptElement) {
		return 'Script tag with id "__NEXT_DATA__" not found'
	}

	// Extract the JSON content from the script tag
	const jsonContent = scriptElement.textContent || ""
	const data = JSON.parse(jsonContent)

	return data.err
}
