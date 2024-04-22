export const getHierarchyMetaData = (type: string | string[]) => {
	switch (type) {
		case "term":
			return {
				title: "Terms",
				description:
					"Explore your learning journey with Lisa AI. Browse through various semesters and terms, and dive into subjects of your choice. Your path to knowledge starts here",
			}
		case "subject":
			return {
				title: "Subjects",
				description:
					"Discover subjects in your chosen term with Lisa AI. A comprehensive list of subjects awaits you. Click to access chapters and start your learning adventure",
			}
		case "chapter":
			return {
				title: "Chapters",
				description:
					"Uncover chapters in your selected subject with Lisa AI. Each chapter is a new opportunity to learn. Click to access topics and deepen your understanding.",
			}
		case "topic":
			return {
				title: "Topics",
				description:
					"Welcome to Lisa AI's topics page. All topics in your chosen chapter reside here. Start learning with Lisa AI in just 10 taps! Yes, you read it right, just 10 taps to knowledge.",
			}
		default:
			return {
				title: "course",
				description:
					"Welcome to Lisa AI's course page. All courses in your chosen term reside here. Start learning with Lisa AI in just 10 taps! Yes, you read it right, just 10 taps to knowledge.",
			}
	}
}

export const getTabsMetaInfo = (tab: string | string[]) => {
	switch (tab) {
		case "resources":
			return {
				title: "Resources - Start Learning",
				description:
					"Dive into Lisa AI's Resources tab while learning a new topic. After a 10-tap slide session, switch to this tab to explore similar content from the web, enhancing your understanding of the topic you're learning. Start your AI education journey with Lisa AI today.",
			}
		case "practiceQuestions":
			return {
				title: "Practice Questions - Start Learning",
				description:
					"Revise and retain your learning with Lisa AI's Practice Questions. Test your knowledge on recently learned topics. Start revising with Lisa AI today.",
			}
		case "chat":
			return {
				title: "1:1 CHAT - AI chat with lisa",
				description:
					"Interact with our AI-driven chat system for a unique learning experience. Unleash the power of personalized education at no-cost with our advanced Lisa AI!",
			}
		default:
			return {
				title: "Explanation - Start Learning",
				description:
					"Begin on your learning journey with Lisa AI. Click to open this topic and learn in interactive and engaging way with interactive chat, resources, practise questions and more.Stat learning with Lisa AI now!",
			}
	}
}
