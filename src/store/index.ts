import { IState } from "@/types/store"
import { create } from "zustand"
import { devtools, redux } from "zustand/middleware"
import { reducer } from "./reducer"

const initialState: IState = {
	user: null,
	orgInfo: null,
	orgConfig: null,
	orgPrompts: null,
	breadCrumbs: [],
	currentHierarchy: "ctsct",
}

const useAIStore = create(
	devtools(redux(reducer, initialState), {
		name: "useAIStore",
		enabled:
			(typeof window !== "undefined" &&
				Boolean(
					(window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
				)) ||
			process.env.VERCEL_ENV !== "production",
	})
)

export default useAIStore
