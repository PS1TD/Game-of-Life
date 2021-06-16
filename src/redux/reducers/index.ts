import { combineReducers } from "redux"
import { gridReducer } from "./gridReducer"
import { styleReducer } from "./styleReducer"

export const rootReducer = combineReducers({
	grid: gridReducer,
	style: styleReducer,
})

export type RootState = ReturnType<typeof rootReducer>
