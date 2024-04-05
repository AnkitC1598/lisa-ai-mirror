import { useCallback, useEffect, useState } from "react"

interface ITextToSpeechProps {
	text: string
}

type AudioState = -1 | 0 | 1

const removeEmojis = (text: string) => {
	// Regular expression to match emojis
	const emojiRegex =
		/[\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

	// Replace emojis with an empty string
	return text.replace(emojiRegex, "")
}

const useTextToSpeech = () => {
	const [synth, setSynth] = useState<SpeechSynthesis | null>(null)
	const [audioState, setAudioState] = useState<AudioState>(0)
	const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
		null
	)

	useEffect(() => {
		const synth = window.speechSynthesis
		setSynth(synth)

		// Clean up
		return () => {
			if (synth && synth.speaking) {
				synth.cancel() // Cancel any ongoing speech synthesis when the component unmounts
			}
		}
	}, [])

	const subscribe = useCallback(
		(text: string) => {
			if (synth) {
				const synthUtterance = new SpeechSynthesisUtterance(text)
				synthUtterance.onstart = () => setAudioState(1)
				synthUtterance.onend = () => {
					setAudioState(0)
					synth.cancel()
				}
				setUtterance(synthUtterance)
			}
		},
		[synth]
	)

	const unsubscribe = () => {
		if (synth && synth.speaking) {
			synth.cancel()
		}
		setAudioState(0)
	}

	const handleAudio = () => {
		if (synth) {
			if (synth.speaking && audioState === 1) {
				synth.pause()
				setAudioState(-1)
			} else if (synth.paused && audioState === -1) {
				synth.resume()
				setAudioState(1)
			} else {
				if (!utterance) return
				synth.speak(utterance)
				setAudioState(1)
			}
		}
	}

	return { subscribe, handleAudio, unsubscribe, audioState }
}

export default useTextToSpeech
