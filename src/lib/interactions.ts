import { fetchClientWithToken } from "@/services/fetch"
import { SetState } from "@/types"
import { removeEmojis } from "."

const getFeedbackApi = ({
	type,
	courseId,
	topicId,
	id,
}: {
	type: string
	courseId: string
	topicId: string
	id: string
}) => {
	switch (type) {
		case "slide":
			return `/ai/slides/slide/feedback/${courseId}/${topicId}/${id}`
		case "chat":
			return `/ai/chat/feedback/${courseId}/${topicId}/${id}`
		case "question":
			return `/ai/questions/feedback/${courseId}/${topicId}/${id}`
		default:
			return ""
	}
}

export const handleAudio = ({
	text,
	audioState,
	setAudioState,
}: {
	text: string
	audioState: number
	setAudioState: SetState<number>
}) => {
	const synth = window.speechSynthesis
	const voices = synth.getVoices()
	if (audioState !== 0) {
		if (synth.speaking && audioState === 1) {
			synth.pause()
			setAudioState(-1)
		} else {
			synth.resume()
			setAudioState(1)
		}
	} else {
		const utterance = new SpeechSynthesisUtterance(removeEmojis(text))
		const enInVoice = voices.find(voice => voice.lang === "en-IN")

		if (enInVoice !== undefined) utterance.voice = enInVoice
		else utterance.voice = voices[0]

		synth.speak(utterance)
		setAudioState(1)
		// setTimeout(() => setAudioState(null), 1000)
		utterance.onend = () => setAudioState(0)
	}
}

export const handleVote = async ({
	resetVote,
	body,
	meta,
}: {
	resetVote: Function
	body: { langCode?: string; feedback: string }
	meta: {
		courseId: string
		topicId: string
		id: string
		type: string
	}
}) => {
	const resp = await fetchClientWithToken(getFeedbackApi(meta), {
		method: "PUT",
		body: JSON.stringify(body),
	})
	if (resp.code !== 200) resetVote()
}

export const handleBookmark = () => {
	console.log("bookmark")
}

export const handleCopy = ({
	text,
	setCopy,
}: {
	text: string
	setCopy: SetState<number>
}) => {
	setCopy(1)
	navigator.clipboard.writeText(text)
	setTimeout(() => setCopy(0), 1000)
}
