import { OpenAIStream } from "ai"
import { clsx, type ClassValue } from "clsx"
import type OpenAI from "openai"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
import zodToJsonSchema from "zod-to-json-schema"
import { TAnyToolDefinitionArray, TToolDefinitionMap } from "./tool-definition"

const consumeStream = async (stream: ReadableStream) => {
	const reader = stream.getReader()
	while (true) {
		const { done } = await reader.read()
		if (done) break
	}
}

export const getType = (key: any): string =>
	Object.prototype.toString.call(key).slice(8, -1)

export const sleep = (delay: number = 1000) =>
	new Promise(resolve => setTimeout(resolve, delay))

export function runOpenAICompletion<
	T extends Omit<
		Parameters<typeof OpenAI.prototype.chat.completions.create>[0],
		"functions"
	>,
	const TFunctions extends TAnyToolDefinitionArray,
>(
	openai: OpenAI,
	params: T & {
		functions: TFunctions
	}
) {
	let text = ""
	let hasFunction = false

	type TToolMap = TToolDefinitionMap<TFunctions>
	let onTextContent: (text: string, isFinal: boolean) => void = () => {}

	const functionsMap: Record<string, TFunctions[number]> = {}
	for (const fn of params.functions) {
		functionsMap[fn.name] = fn
	}

	let onFunctionCall = {} as any

	const { functions, ...rest } = params

	;(async () => {
		consumeStream(
			OpenAIStream(
				(await openai.chat.completions.create({
					...rest,
					stream: true,
					functions: functions.map(fn => {
						return {
							name: fn.name,
							description: fn.description,
							parameters: zodToJsonSchema(
								fn.parameters
							) as Record<string, unknown>,
						}
					}),
				})) as any,
				{
					async experimental_onFunctionCall(functionCallPayload) {
						hasFunction = true

						if (!onFunctionCall[functionCallPayload.name]) {
							return
						}

						onFunctionCall[functionCallPayload.name]?.(
							functionCallPayload.arguments
						)
					},
					onToken(token) {
						text += token
						if (text.startsWith("{")) return
						onTextContent(text, false)
					},
					onFinal() {
						if (hasFunction) return
						onTextContent(text, true)
					},
				}
			)
		)
	})()

	return {
		onTextContent: (
			callback: (text: string, isFinal: boolean) => void | Promise<void>
		) => {
			onTextContent = callback
		},
		onFunctionCall: <TName extends TFunctions[number]["name"]>(
			name: TName,
			callback: (
				args: z.output<
					TName extends keyof TToolMap
						? TToolMap[TName] extends infer TToolDef
							? TToolDef extends TAnyToolDefinitionArray[number]
								? TToolDef["parameters"]
								: never
							: never
						: never
				>
			) => void | Promise<void>
		) => {
			onFunctionCall[name] = callback
		},
	}
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formatNumber = (value: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value)

export const runAsyncFnWithoutBlocking = (
	fn: (...args: any) => Promise<any>
) => {
	fn()
}

export const removeEmojis = (string: string) => {
	var regex =
		/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
	return string.replace(regex, "")
}
