import { StyleAction, StyleActionTypes } from "../reducers/styleReducer"

export function resetStyles(): StyleAction {
	return {
		type: StyleActionTypes.RESET_STYLES,
	}
}

export function toggleBorder(): StyleAction {
	return {
		type: StyleActionTypes.TOGGLE_BORDER,
	}
}
