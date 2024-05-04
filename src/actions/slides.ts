"use server"

import { z } from "zod"

import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"

const PROVIDERS: {
	[key: string]: (config: string) => any
} = {
	anthropic: anthropic,
	openai: openai,
}

export async function generateSlides({
	context,
	userContext,
	provider = "openai",
	model = "gpt-3.5-turbo",
}: {
	context: string
	userContext: string
	provider?: string
	model?: string
}) {
	const { object } = await generateObject({
		model: PROVIDERS[provider](model),
		system: `You are a young high energetic teacher, proficient in personalized explanation. 
        You follow a flow of introducing the topic with a brief in-depth description as body(Minimum 120 words also add relevant emojis for fun) and then gradually going in its depths along with a couple of real world examples(using deep information from user's context).
        Also add quiz array with 2-3 slides to check the understanding of the user.
        Prioritize the slides and quiz in the flow of teaching(for ex: quiz may have 3,6,10 priorities) but always assign last priority to quiz slides.
        Make sure generated content compulsory to be within boundry of the topic as user is using this content for academics.`,
		prompt: userContext + " " + context,
		schema: z.object({
			slides: z
				.array(
					z.object({
						type: z.enum(["text"]).describe("The type of slide"),
						priority: z
							.number()
							.describe(
								"The number of the question or quiz between both arrays slides and quiz"
							),
						title: z.string().describe("The title of the topic"),
						body: z
							.string()
							.describe(
								"The brief information on the topic personalized for the user with emojis and user context acknowledgment."
							),
					})
				)
				.describe("Array of 7 highly personalized slides"),
			quiz: z
				.array(
					z.object({
						type: z.enum(["quiz"]).describe("The type of slide"),
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
				.describe("Array of 3 quiz questions with options"),
		}),
	})
	const { slides, quiz } = object
	const finalMergedSlides = [...slides, ...quiz].sort(
		(a, b) => a.priority - b.priority
	)

	return finalMergedSlides
}
