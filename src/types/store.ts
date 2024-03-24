import { TCurrentHierarchy } from "./hierarchy"

export interface IState {
	user: Record<string, any> | null
	orgInfo: Record<string, any> | null
	orgConfig: Record<string, any> | null
	orgPrompts: Record<string, any> | null
	breadCrumbs: Record<string, any>[] | []
	currentHierarchy: TCurrentHierarchy
}

export interface IAction {
	type: string
	payload?: any // Define the payload type as needed
}
