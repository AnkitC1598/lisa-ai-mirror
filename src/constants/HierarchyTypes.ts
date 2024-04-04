import { THierarchyType } from "@/types/hierarchy"

const HierarchyTypes: Record<string, THierarchyType[]> = {
	ctsct: ["course", "term", "subject", "chapter", "topic"],
	csct: ["course", "subject", "chapter", "topic"],
	cst: ["course", "subject", "topic"],
	ct: ["course", "topic"],
}

export default HierarchyTypes
