import { combineReducers } from "redux"
import { gridReducer } from "./gridReducer"
import { settingsReducer } from "./settingsReducer"
import { styleReducer } from "./styleReducer"

export const rootReducer = combineReducers({
	grid: gridReducer,
	style: styleReducer,
	settings: settingsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
