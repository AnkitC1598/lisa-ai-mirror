import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"
import { ChatCompletionCreateParams } from "openai/resources/index"
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
			"Generate JSON with 10 highly personalized slides & 3 quiz for the topic",
		parameters: zodToJsonSchema(
			z.object({
				quiz: z
					.array(
						z.object({
							type: z
								.enum(["quiz"])
								.describe("The type of slide"),
							priority: z
								.number()
								.describe(
									"The number of the question or quiz between both arrays slides and quiz"
								),
							question: z
								.string()
								.describe("The question of the quiz"),
							answers: z
								.array(
									z.object({
										body: z
											.string()
											.describe("The option of the quiz"),
										isCorrect: z
											.boolean()
											.describe("Is the option correct"),
									})
								)
								.describe("Array of options"),
						})
					)
					.min(3)
					.describe("Array of quiz questions with options"),
				slides: z
					.array(
						z.object({
							type: z
								.enum(["text"])
								.describe("The type of slide"),
							priority: z
								.number()
								.describe(
									"The number of the question or quiz between both arrays slides and quiz"
								),
							title: z
								.string()
								.describe("The title of the topic"),
							body: z
								.string()
								.describe(
									"The brief information on the topic personalized for the user with emojis and user context acknowledgment."
								),
						})
					)
					.min(10)
					.describe("Array of 10 highly personalized slides"),
			})
		),
	},
]

export async function POST(req: Request) {
	const { messages } = await req.json()

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo-0613",
		stream: true,
		messages,
		functions,
	})

	const stream = OpenAIStream(response, {
		experimental_onFunctionCall: async ({ name, arguments: args }) => {
			return JSON.stringify(args)
		},
	})
	return new StreamingTextResponse(stream)
}
