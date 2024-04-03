import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"
import { ChatCompletionCreateParams } from "openai/resources/index.mjs"
import { z } from "zod"
import zodToJsonSchema from "zod-to-json-schema"

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "",
})

// Set the runtime to edge
export const runtime = "edge"

// Function definition:
const functions: ChatCompletionCreateParams.Function[] = [
	{
		name: "explain_topic",
		description:
			"Generate JSON with 10 highly personalized slides for a topic",
		parameters: {
			type: "object",
			properties: {
				quiz: {
					type: "array",
					items: {
						type: "object",
						properties: {
							type: {
								type: "string",
								enum: ["quiz"],
								description: "The type of slide",
							},
							priority: {
								type: "number",
								description:
									"The number of the question or quiz between both arrays slides and quiz",
							},
							question: {
								type: "string",
								description: "The question of the quiz",
							},
							answers: {
								type: "array",
								items: {
									type: "object",
									properties: {
										body: {
											type: "string",
											description:
												"The option of the quiz",
										},
										isCorrect: {
											type: "boolean",
											description:
												"Is the option correct",
										},
									},
									required: ["body", "isCorrect"],
									additionalProperties: false,
								},
								description: "Array of options",
							},
						},
						required: ["type", "priority", "question", "answers"],
						additionalProperties: false,
					},
					description: "Array of quiz questions with options",
				},
				slides: {
					type: "array",
					items: {
						type: "object",
						properties: {
							type: {
								type: "string",
								enum: ["text"],
								description: "The type of slide",
							},
							priority: {
								type: "number",
								description:
									"The number of the question or quiz between both arrays slides and quiz",
							},
							title: {
								type: "string",
								description: "The title of the topic",
							},
							body: {
								type: "string",
								description:
									"The brief information on the topic personalized for the user with emojis and user context acknowledgment.",
							},
						},
						required: ["type", "priority", "title", "body"],
						additionalProperties: false,
					},
					minItems: 10,
					description: "Array of 10 highly personalized slides",
				},
			},
			required: ["quiz", "slides"],
			additionalProperties: false,
		},
	},
]

// And use it like this:
export async function POST(req: Request) {
	const { messages } = await req.json()

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo-0613",
		stream: true,
		messages,
		functions,
	})

	const stream = OpenAIStream(response, {
		onCompletion(completion) {
			console.log("completion", completion)
		},
		onFinal(completion) {
			console.log("final", completion)
		},
	})

	return new StreamingTextResponse(stream)
}
