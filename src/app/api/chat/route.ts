import { BytesOutputParser } from "@langchain/core/output_parsers"
import { PromptTemplate } from "@langchain/core/prompts"
import { ChatOpenAI } from "@langchain/openai"
import { StreamingTextResponse, Message as VercelChatMessage } from "ai"
import { NextRequest } from "next/server"

export const runtime = "edge"

const formatMessage = (message: VercelChatMessage) => {
	return `${message.role}: ${message.content}`
}

const TEMPLATE = `You are lisaAi - a chatbot that strictly answers within the context boundary even if it deeply relates to topic otherwise escapes to answer.
Current topic boundary: {topic_boundary}
Current conversation:
{chat_history}
User: {input}
AI:`

export async function POST(req: NextRequest) {
	const { topic_boundary, messages = [] } = await req.json()
	const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
	const currentMessageContent = messages[messages.length - 1].content

	const prompt = PromptTemplate.fromTemplate(TEMPLATE)
	const model = new ChatOpenAI({
		temperature: 0.8,
		streaming: true,
	})
	const outputParser = new BytesOutputParser()

	const chain = prompt.pipe(model).pipe(outputParser)

	const stream = await chain.stream({
		chat_history: formattedPreviousMessages.join("\n"),
		input: currentMessageContent,
		topic_boundary,
	})

	return new StreamingTextResponse(stream)
}
