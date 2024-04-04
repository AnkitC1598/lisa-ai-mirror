import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"
import { ChatCompletionCreateParams } from "openai/resources/index"
import { z } from "zod"
import zodToJsonSchema from "zod-to-json-schema"

// Switch Case to generate system message
const getSystemMessage = (type: string) => {
	switch (type) {
		case "explain_topic":
			return `You are a young high energetic teacher, proficient in personalized microlearning explanation. 
			You follow a flow of introducing the topic with a brief in-depth description as body(Minimum 50 words also add relevant emojis for fun) and then gradually going in its depths along with a couple of real world examples(using deep information from user's context).
			Also add quiz array with 2-3 slides to check the understanding of the user.
			Add priority to the entire output as placing the quiz priorities between slides.
			If the user requests explanation of a topic, call \`explain_topic\` to show the explanation UI with 10 highly personalized slides and 3 quiz.`
		default:
			return ""
	}
}

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
	const { messages, body } = await req.json()

	const response = await openai.chat.completions.create({
		model: "gpt-4",
		stream: true,
		messages: [
			{
				role: "system",
				content: getSystemMessage(body.type),
			},
			...(body.userContext
				? [
						{
							role: "user",
							content: body.context,
						},
					]
				: []),
			...messages,
		],
		functions,
	})

	const stream = OpenAIStream(response, {
		experimental_onFunctionCall: async ({ name, arguments: args }) => {
			return JSON.stringify(args)
		},
	})
	return new StreamingTextResponse(stream)
}
