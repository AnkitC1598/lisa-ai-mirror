"use server"

import { questionsSchema, slidesSchema } from "@/schema/ai"
import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"

const PROVIDERS: {
	[key: string]: (config: string) => any
} = {
	anthropic: anthropic,
	openai: openai,
}

const SYSTEM_PROPMTS: {
	[key: string]: string
} = {
	slides: `You are a young high energetic teacher, proficient in personalized explanation. 
	You follow a flow of introducing the topic with a brief in-depth description as body(Minimum 120 words also add relevant emojis for fun) and then gradually going in its depths along with a couple of real world examples(using deep information from user's context).
	Also add quiz array with 2-3 slides to check the understanding of the user.
	Prioritize the slides and quiz in the flow of teaching(for ex: quiz may have 3,6,10 priorities) but always assign last priority to quiz slides.
	Make sure generated content compulsory to be within boundry of the topic as user is using this content for academics.`,
	questions: `Generate 10 practice questions along with their answers on given topic. Ensure that the questions cover the topic and the important points in it and that the question and answers are clearly and nicely formatted. Questions should not contain any indexing.`,
}

const SchemaObj: {
	[key: string]: any
} = {
	slides: slidesSchema,
	questions: questionsSchema,
}

export async function generateAiResponse({
	context,
	userContext = "",
	provider = "openai",
	model = "gpt-3.5-turbo",
	promptType = "slides",
}: {
	context: string
	userContext?: string
	provider?: string
	model?: string
	promptType?: string
}) {
	const { object } = await generateObject({
		model: PROVIDERS[provider](model),
		system: SYSTEM_PROPMTS[promptType],
		prompt: userContext + " " + context,
		schema: SchemaObj[promptType],
	})

	return object
}
