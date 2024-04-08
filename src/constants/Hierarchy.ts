import ChapterIcon from "@/svg/chapter"
import SubjectIcon from "@/svg/subject"
import TermIcon from "@/svg/term"
import TopicIcon from "@/svg/topic"
import { IHierarchyConstant } from "@/types/hierarchy"

const HierarchyConstants: IHierarchyConstant = {
	cohort: {
		icon: TermIcon,
		colors: {
			card: {
				border: "hover:border-violet-400 dark:hover:border-violet-800",
				icon: "text-violet-300 dark:text-violet-600",
				bg: "bg-violet-100 dark:bg-violet-800",
				text: "text-violet-700 dark:text-violet-50",
			},
			content: {
				createIcon: "text-violet-500",
				dataIcon: "text-violet-200 dark:text-violet-500",
			},
			form: {
				bg: "bg-violet-800",
				text: "text-violet-50",
				lightText: "text-violet-200",
			},
			badge: "bg-violet-50 ring-violet-700/10 dark:bg-violet-400/10 dark:ring-violet-400/30 text-violet-800 dark:text-violet-400",
			peek: {
				border: "stroke-violet-300 dark:stroke-violet-700",
				bg: "fill-violet-100 dark:fill-violet-950",
			},
		},
	},
	term: {
		icon: TermIcon,
		colors: {
			card: {
				border: "hover:border-pink-400 dark:hover:border-pink-800",
				icon: "text-pink-300 dark:text-pink-600",
				bg: "bg-pink-100 dark:bg-pink-800",
				text: "text-pink-700 dark:text-pink-50",
			},
			content: {
				createIcon: "text-pink-500",
				dataIcon: "text-pink-200 dark:text-pink-500",
			},
			form: {
				bg: "bg-pink-800",
				text: "text-pink-50",
				lightText: "text-pink-200",
			},
			badge: "bg-pink-50 ring-pink-700/10 dark:bg-pink-400/10 dark:ring-pink-400/30 text-pink-800 dark:text-pink-400",
			peek: {
				border: "stroke-pink-300 dark:stroke-pink-700",
				bg: "fill-pink-100 dark:fill-pink-950",
			},
		},
	},
	subject: {
		icon: SubjectIcon,
		colors: {
			card: {
				border: "hover:border-purple-400 dark:hover:border-purple-800",
				icon: "text-purple-300 dark:text-purple-600",
				bg: "bg-purple-100 dark:bg-purple-800",
				text: "text-purple-700 dark:text-purple-50",
			},
			content: {
				createIcon: "text-purple-500",
				dataIcon: "text-purple-200 dark:text-purple-500",
			},
			form: {
				bg: "bg-purple-800",
				text: "text-purple-50",
				lightText: "text-purple-200",
			},
			badge: "bg-purple-50 ring-purple-700/10 dark:bg-purple-400/10 dark:ring-purple-400/30 text-purple-800 dark:text-purple-400",
			peek: {
				border: "stroke-purple-300 dark:stroke-purple-700",
				bg: "fill-purple-100 dark:fill-purple-950",
			},
		},
	},
	chapter: {
		icon: ChapterIcon,
		colors: {
			card: {
				border: "hover:border-blue-400 dark:hover:border-blue-800",
				icon: "text-blue-300 dark:text-blue-600",
				bg: "bg-blue-100 dark:bg-blue-800",
				text: "text-blue-700 dark:text-blue-50",
			},
			content: {
				createIcon: "text-blue-500",
				dataIcon: "text-blue-200 dark:text-blue-500",
			},
			form: {
				bg: "bg-blue-800",
				text: "text-blue-50",
				lightText: "text-blue-200",
			},
			badge: "bg-blue-50 ring-blue-700/10 dark:bg-blue-400/10 dark:ring-blue-400/30 text-blue-800 dark:text-blue-400",
			peek: {
				border: "stroke-blue-300 dark:stroke-blue-700",
				bg: "fill-blue-100 dark:fill-blue-950",
			},
		},
	},
	topic: {
		icon: TopicIcon,
		colors: {
			card: {
				border: "hover:border-rose-400 dark:hover:border-rose-800",
				icon: "text-rose-300 dark:text-rose-600",
				bg: "bg-rose-100 dark:bg-rose-800",
				text: "text-rose-700 dark:text-rose-50",
			},
			content: {
				createIcon: "text-rose-500",
				dataIcon: "text-rose-200 dark:text-rose-500",
			},
			form: {
				bg: "bg-rose-800",
				text: "text-rose-50",
				lightText: "text-rose-200",
			},
			badge: "bg-rose-50 ring-rose-700/10 dark:bg-rose-400/10 dark:ring-rose-400/30 text-rose-800 dark:text-rose-400",
			peek: {
				border: "stroke-rose-300 dark:stroke-rose-700",
				bg: "fill-rose-100 dark:fill-rose-950",
			},
		},
	},
	default: {
		icon: null,
		colors: {
			card: {
				border: "hover:border-neutral-400 dark:hover:border-neutral-800",
				icon: "text-neutral-300 dark:text-neutral-600",
				bg: "bg-neutral-100 dark:bg-neutral-800",
				text: "text-neutral-700 dark:text-neutral-50",
			},
			content: {
				createIcon: "text-neutral-500",
				dataIcon: "text-neutral-200 dark:text-neutral-500",
			},
			form: {
				bg: "bg-neutral-800",
				text: "text-neutral-50",
				lightText: "text-neutral-200",
			},
			badge: "bg-neutral-50 ring-neutral-700/10 dark:bg-neutral-400/10 dark:ring-neutral-400/30 text-neutral-800 dark:text-neutral-400",
			peek: {
				border: "stroke-neutral-300 dark:stroke-neutral-700",
				bg: "fill-neutral-100 dark:fill-neutral-950",
			},
		},
	},
}

export default HierarchyConstants
