import { removeEmojis } from "."

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

export const handleVote = (
	type: string,
	vote: string | null,
	setVote: (audioState: string | null) => void
) => {
	console.log(type, vote)
	setVote(type)
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
