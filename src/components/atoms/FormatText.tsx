import parse from "html-react-parser"
import { useTheme } from "next-themes"
import root from "react-shadow"

const styles = `
a {
	color: rgb(59 130 246);
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
	text-underline-offset: 2px;
}
.break-words {
    overflow-wrap: break-word;
    text-wrap: wrap;
}
.text-gray-300 {
    color: #d1d5db;
}
.text-gray-200 {
	color: #e5e7eb;
}
.bg-neutral-700 {
	background-color: #404040;
}
.bg-neutral-950 {
    background-color: #0a0a0a;
}
.p-1 {
    padding: 0.25rem;
}
.rounded-md {
    border-radius: 0.375rem;
}
.select-text {
	-webkit-user-select: text; /* Safari */
	-moz-user-select: text; /* Firefox */
	-ms-user-select: text; /* IE 10 and IE 11 */
	user-select: text; /* Standard syntax */
}
.comment {
    color: #6a9955; /* Green */
}
`

const FormatText = ({ text = "", customStyles = ``, allowSelect = false }) => {
	const { theme } = useTheme()
	const formatTextCode = (response: string) => {
		const codeRegex = /```([\s\S]*?)```/g
		const formattedResponse = response.replace(codeRegex, (match, code) => {
			// Add CSS class for comments in different languages
			code = code.replace(
				/\/\/.*$|\/\*[\s\S]*?\*\/|#.*|<!--.*-->|\/\*.*\*\/|\/\/.*?\n|\/\/.*|<!--.*?-->|\/\/.*\s*|<!\-\-[\s\S]*?\-\->|\/\/.*\s*/gm,
				'<span class="comment break-words">$&</span>'
			)

			return `<pre class="${theme === "light" ? "bg-neutral-700 text-gray-200" : "bg-neutral-950 text-gray-300"} p-1 rounded-md"><code class="break-words">${code}</code></pre>`
		})
		return formattedResponse
	}
	const createLinks = (text: string) => {
		const urlRegex = /(?:https?|ftp):\/\/[^\s/$.?#]+\.[^\s]*/g
		const linkedText = text.replace(
			urlRegex,
			url => `<a href="${url}" target="_blank">${url}</a>`
		)
		return linkedText
	}

	return (
		<>
			<root.span>
				{parse(
					`<span class="break-words ${
						allowSelect ? "select-text" : ""
					}">${createLinks(formatTextCode(text))}</span>`
				)}
				<style type="text/css">{styles + customStyles}</style>
			</root.span>
		</>
	)
}

export default FormatText
