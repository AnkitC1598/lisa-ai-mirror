import "server-only"

import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc"
import OpenAI from "openai"

import PracticeQuestions, {
	PracticeQuestionsSkeletonLoader,
} from "@/components/organisms/PracticeQuestions"
import { runOpenAICompletion } from "@/lib"
import { fetchClientWithToken } from "@/services/fetch"
import { z } from "zod"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "",
})

async function generatePracticeQuestions({
	content = "",
	cohortId = "",
	topicId = "",
}) {
	"use server"

	const aiState = getMutableAIState<typeof AI>()
	aiState.update([
		...aiState.get(),
		{
			role: "user",
			content,
		},
	])

	const reply = createStreamableUI(<PracticeQuestionsSkeletonLoader />)

	const completion = runOpenAICompletion(openai, {
		model: "gpt-4",
		// response_format: {
		//   type: "json_object",
		// },
		stream: true,
		messages: [
			{
				role: "system",
				content: `Generate 10 practice questions along with their answers on given topic. Ensure that the questions cover the topic and the important points in it and that the question and answers are clearly and nicely formatted. Questions should not contain any indexing.
				If the user requests to generate practice questions of a topic, call \`generate_questions\` to show the practice questions UI with the generated questions.`,
			},
			...aiState.get().map((info: any) => ({
				role: info.role,
				content: info.content,
				name: info.name,
			})),
		],
		functions: [
			{
				name: "generate_questions",
				description:
					"Generate JSON with practice questions for the topic",
				parameters: z.object({
					questions: z
						.array(
							z.object({
								question: z
									.string()
									.describe("The question of the topic"),
								answer: z
									.string()
									.describe(
										"The answer of the practice question."
									),
							})
						)
						.min(10)
						.describe("Array of practice questions"),
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
	completion.onFunctionCall("generate_questions", async ({ questions }) => {
		await fetchClientWithToken(`/ai/questions/${cohortId}/${topicId}`, {
			method: "POST",
			body: JSON.stringify({
				questions: questions,
			}),
		})

		reply.done(<PracticeQuestions questions={questions} />)

		aiState.done([
			...aiState.get(),
			{
				role: "function",
				name: "explain_topic",
				content: JSON.stringify(questions),
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
		generatePracticeQuestions,
	},
	initialUIState,
	initialAIState,
})
