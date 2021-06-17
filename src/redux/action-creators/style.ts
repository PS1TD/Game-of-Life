import { StyleAction, StyleActionTypes } from "../reducers/styleReducer"

export function resetStyles(): StyleAction {
	return {
		type: StyleActionTypes.RESET_STYLES,
	}
}

export function updateStyles(aliveColor?: string, deadColor?: string, borderColor?: string, border?: boolean): StyleAction {
	return {
		type: StyleActionTypes.UPDATE_STYLES,
		aliveColor: aliveColor,
		deadColor: deadColor,
		borderColor: borderColor,
		border: border,
	}
}
