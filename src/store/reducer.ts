import { IAction, IState } from "@/types/store"
import { produce } from "immer"

// Define the type for the reducer function
type IReducer = (state: IState, action: IAction) => IState

export const reducer: IReducer = (state, { type, payload }) => {
	switch (type) {
		case "SET_STATE":
			return produce(state, draft => {
				for (let i in payload) (draft as any)[i] = payload[i]
			})
		default:
			return state
	}
}
