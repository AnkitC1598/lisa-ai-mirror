import { fetchClientWithToken } from "@/services/fetch"
import { removeEmojis } from "."

// Create a switch case for the feedback type
const getFeedbackApi = (
	type: string,
	courseId: string,
	topicId: string,
	id: string
) => {
	switch (type) {
		case "slide":
			return `/ai/slides/slide/feedback/${courseId}/${topicId}/${id}`
		case "chat":
			return `/ai/chat/feedback/${courseId}/${topicId}/${id}`
		case "quiz":
			return `/ai/quiz/feedback/${courseId}/${topicId}/${id}`
		default:
			return ""
	}
}

export const handleAudio = (
	text: string,
	audioState: string | null,
	setAudioState: (audioState: string | null) => void
) => {
	const synth = window.speechSynthesis
	const voices = synth.getVoices()
	if (audioState !== null) {
		if (synth.speaking && audioState === "playing") {
			synth.pause()
			setAudioState("paused")
		} else {
			synth.resume()
			setAudioState("playing")
		}
	} else {
		const utterance = new SpeechSynthesisUtterance(removeEmojis(text))
		const enInVoice = voices.find(voice => voice.lang === "en-IN")

		if (enInVoice !== undefined) utterance.voice = enInVoice
		else utterance.voice = voices[0]

		synth.speak(utterance)
		setAudioState("playing")
		// setTimeout(() => setAudioState(null), 1000)
		utterance.onend = () => setAudioState(null)
	}
}

export const handleVote = async ({
	type = "",
	vote = "",
	setVote = () => {},
	courseId = "",
	topicId = "",
	id = "",
	body = {},
}) => {
	await fetchClientWithToken(getFeedbackApi(type, courseId, topicId, id), {
		method: "PUT",
		body: JSON.stringify(body),
	})
	// @ts-ignore
	setVote(body.feedback)
}

export const handleBookmark = () => {
	console.log("bookmark")
}

export const handleCopy = (
	text: string,
	copy: string | null,
	setCopy: (copy: string | null) => void
) => {
	setCopy("copying")
	navigator.clipboard.writeText(text)
	setTimeout(() => setCopy(null), 1000)
}
