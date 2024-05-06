import { z } from "zod"

export const slidesSchema = z.object({
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
				question: z.string().describe("The question of the quiz"),
				answers: z
					.array(
						z.object({
							body: z.string().describe("The option of the quiz"),
							isCorrect: z
								.boolean()
								.describe("Is the option correct"),
						})
					)
					.describe("Array of options"),
			})
		)
		.describe("Array of 3 quiz questions with options"),
})

export const questionsSchema = z.object({
	questions: z
		.array(
			z.object({
				question: z.string().describe("The question of the topic"),
				answer: z
					.string()
					.describe("The answer of the practice question."),
			})
		)
		.min(10)
		.describe("Array of practice questions"),
})
