import { TCohortHierarchyType, THierarchyType } from "@/types/hierarchy"

const HierarchyTypes: Record<string, THierarchyType[]> = {
	ctsct: ["course", "term", "subject", "chapter", "topic"],
	csct: ["course", "subject", "chapter", "topic"],
	cst: ["course", "subject", "topic"],
	ct: ["course", "topic"],
}

export const CohortHierarchyTypes: Record<string, TCohortHierarchyType[]> = {
	ctsct: ["cohort", "term", "subject", "chapter", "topic"],
	csct: ["cohort", "subject", "chapter", "topic"],
	cst: ["cohort", "subject", "topic"],
	ct: ["cohort", "topic"],
}

export default HierarchyTypes
