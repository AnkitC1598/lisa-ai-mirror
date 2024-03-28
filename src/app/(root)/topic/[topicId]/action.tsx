import "server-only"

import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc"
import OpenAI from "openai"

import Slides, { SlidesSkeletonLoader } from "@/components/organisms/Slides"
import { runOpenAICompletion } from "@/lib"
import { z } from "zod"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "",
})

async function submitUserMessage(content: string) {
	"use server"

	const aiState = getMutableAIState<typeof AI>()
	aiState.update([
		...aiState.get(),
		{
			role: "user",
			content,
		},
	])

	const reply = createStreamableUI(<SlidesSkeletonLoader />)

	// ai || user || system || function

	// Teach this topic to Abhishek, a 22-year-old student based in ratlam, madhya pradesh. He enjoys coding, during his during his free time and has a soft spot for bollywood music. he loves indian street food and enjoys tom cruise Movies. mission impossible is abhishek's all time fav movie. he likes to play cricket.

	const completion = runOpenAICompletion(openai, {
		model: "gpt-4",
		// response_format: {
		//   type: "json_object",
		// },
		stream: true,
		messages: [
			{
				role: "system",
				content: `
		You are a young high energetic teacher, proficient in personalized microlearning explanation. 
		You follow a flow of introducing the topic with a brief in-depth description as body(Minimum 50 words also add relevant emojis for fun) and then gradually going in its depths along with a couple of real world examples(using deep information from user's context).
		Also add quiz array with 2-3 slides to check the understanding of the user.
		Add priority to each slide and quiz and bind the priorities accordingly across quiz and slides.
		If the user requests explanation of a topic, call \`explain_topic\` to show the explanation UI with 10 highly personalized slides and 3 quiz.`,
			},
			{
				role: "user",
				content: `I am Abhishek, a 22-year-old student based in ratlam, madhya pradesh. I enjoys coding during my free time and love listening to bollywood music. I love indian street food and enjoy tom cruise movies. Mission impossible is my all time fav movie. I like to play cricket.`,
			},
			...aiState.get().map((info: any) => ({
				role: info.role,
				content: info.content,
				name: info.name,
			})),
		],
		functions: [
			{
				name: "explain_topic",
				description:
					"Generate JSON with 10 highly personalized slides for a topic",
				parameters: z.object({
					quiz: z
						.array(
							z.object({
								priority: z
									.number()
									.describe(
										"The number of the question or quiz between both arrays slides and quiz"
									),
								question: z
									.string()
									.describe("The question of the quiz"),
								options: z
									.array(
										z.object({
											option: z
												.string()
												.describe(
													"The option of the quiz"
												),
											isCorrect: z
												.boolean()
												.describe(
													"Is the option correct"
												),
										})
									)
									.describe("Array of options"),
							})
						)
						.describe("Array of quiz questions with options"),
					slides: z
						.array(
							z.object({
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
								// // Add the type for quiz and text and example
								// type: z
								//   .enum(["quiz", "text", "example"])
								//   .describe("The type of slide"),
							})
						)
						.min(10)
						.describe("Array of 10 highly personalized slides"),
				}),
			},
		],
		temperature: 0,
	})

	completion.onTextContent((content: string, isFinal: boolean) => {
		// reply.update(<BotMessage>{content}</BotMessage>);
		if (isFinal) {
			reply.done()
			aiState.done([...aiState.get(), { role: "assistant", content }])
		}
	})
	completion.onFunctionCall("explain_topic", async ({ slides, quiz }) => {
		// reply.update(<SlidesSkeletonLoader />)

		// await sleep(1000)
		console.log(slides, quiz)

		// await fetch("http://localhost:3000/api", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify({
		// 		title: "Fetch POST Request Example",
		// 		data: slides,
		// 	}),
		// })

		reply.done(
			<Slides
				// @ts-ignore
				slides={slides}
				// @ts-ignore
				quiz={quiz}
			/>
		)

		aiState.done([
			...aiState.get(),
			{
				role: "function",
				name: "explain_topic",
				content: JSON.stringify(slides),
			},
		])
	})

	return {
		id: Date.now(),
		role: "assistant",
		display: reply.value,
	}
}

// Define necessary types and create the AI.

const initialAIState: {
	role: "user" | "assistant" | "system" | "function"
	content: string
	id?: string
	name?: string
}[] = []

const initialUIState: {
	id: number
	display: React.ReactNode
	role: "user" | "assistant"
}[] = []

export const AI = createAI({
	actions: {
		submitUserMessage,
	},
	initialUIState,
	initialAIState,
})
