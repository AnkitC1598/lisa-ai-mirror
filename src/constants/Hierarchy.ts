import ChapterIcon from "@/svg/chapter"
import SubjectIcon from "@/svg/subject"
import TermIcon from "@/svg/term"
import TopicIcon from "@/svg/topic"
import { IHierarchyConstantData } from "@/types/hierarchy"

const HierarchyConstants: IHierarchyConstantData = {
	cohort: {
		icon: TermIcon,
		colors: {
			card: {
				border: "hover:border-pink-400 dark:hover:border-pink-800",
				icon: "group-hover:text-pink-500",
				bg: "bg-pink-100 dark:bg-pink-800",
				text: "text-pink-700 dark:text-pink-50",
			},
			content: {
				createIcon: "group-hover:text-pink-500",
				dataIcon: "text-pink-200 dark:text-pink-500",
			},
			form: {
				bg: "bg-pink-800",
				text: "text-pink-50",
				lightText: "text-pink-200",
			},
		},
	},
	term: {
		icon: TermIcon,
		colors: {
			card: {
				border: "hover:border-pink-400 dark:hover:border-pink-800",
				icon: "group-hover:text-pink-500",
				bg: "bg-pink-100 dark:bg-pink-800",
				text: "text-pink-700 dark:text-pink-50",
			},
			content: {
				createIcon: "group-hover:text-pink-500",
				dataIcon: "text-pink-200 dark:text-pink-500",
			},
			form: {
				bg: "bg-pink-800",
				text: "text-pink-50",
				lightText: "text-pink-200",
			},
		},
	},
	subject: {
		icon: SubjectIcon,
		colors: {
			card: {
				border: "hover:border-purple-400 dark:hover:border-purple-800",
				icon: "group-hover:text-purple-500",
				bg: "bg-purple-100 dark:bg-purple-800",
				text: "text-purple-700 dark:text-purple-50",
			},
			content: {
				createIcon: "group-hover:text-purple-500",
				dataIcon: "text-purple-200 dark:text-purple-500",
			},
			form: {
				bg: "bg-purple-800",
				text: "text-purple-50",
				lightText: "text-purple-200",
			},
		},
	},
	chapter: {
		icon: ChapterIcon,
		colors: {
			card: {
				border: "hover:border-blue-400 dark:hover:border-blue-800",
				icon: "group-hover:text-blue-500",
				bg: "bg-blue-100 dark:bg-blue-800",
				text: "text-blue-700 dark:text-blue-50",
			},
			content: {
				createIcon: "group-hover:text-blue-500",
				dataIcon: "text-blue-200 dark:text-blue-500",
			},
			form: {
				bg: "bg-blue-800",
				text: "text-blue-50",
				lightText: "text-blue-200",
			},
		},
	},
	topic: {
		icon: TopicIcon,
		colors: {
			card: {
				border: "hover:border-rose-400 dark:hover:border-rose-800",
				icon: "group-hover:text-rose-500",
				bg: "bg-rose-100 dark:bg-rose-800",
				text: "text-rose-700 dark:text-rose-50",
			},
			content: {
				createIcon: "group-hover:text-rose-500",
				dataIcon: "text-rose-200 dark:text-rose-500",
			},
			form: {
				bg: "bg-rose-800",
				text: "text-rose-50",
				lightText: "text-rose-200",
			},
		},
	},
	default: {
		icon: null,
		colors: {
			card: {
				border: "hover:border-neutral-400 dark:hover:border-neutral-800",
				icon: "group-hover:text-neutral-500",
				bg: "bg-neutral-100 dark:bg-neutral-800",
				text: "text-neutral-700 dark:text-neutral-50",
			},
			content: {
				createIcon: "group-hover:text-neutral-500",
				dataIcon: "text-neutral-200 dark:text-neutral-500",
			},
			form: {
				bg: "bg-neutral-800",
				text: "text-neutral-50",
				lightText: "text-neutral-200",
			},
		},
	},
}

export default HierarchyConstants
