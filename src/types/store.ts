import { ITopic, TCurrentHierarchy } from "./hierarchy"
import { IUser } from "./user"

export interface IState {
	user: IUser | null
	orgInfo: Record<string, any> | null
	orgConfig: Record<string, any> | null
	orgPrompts: Record<string, any> | null
	breadcrumbs: Record<string, any>[] | []
	currentHierarchy: TCurrentHierarchy | null
	currentTopic: ITopic | null
}

export interface IAction {
	type: string
	payload?: any // Define the payload type as needed
}
