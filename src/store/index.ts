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
			typeof window !== "undefined" ||
			process.env.VERCEL_ENV !== "production",
	})
)

export default useAIStore
