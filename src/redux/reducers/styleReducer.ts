interface StyleState {
	deadColor: string
	aliveColor: string
	borderColor: string
	border: boolean
}

export enum StyleActionTypes {
	RESET_STYLES = "RESET_STYLES",
	UPDATE_STYLES = "UPDATE_STYLES",
	TOGGLE_BORDER = "TOGGLE_BORDER",
}

interface ResetStyleAction {
	type: StyleActionTypes.RESET_STYLES
}

interface UpdateStyleAction {
	type: StyleActionTypes.UPDATE_STYLES
	deadColor: string | null
	aliveColor: string | null
	borderColor: string | null
}

interface ToggleBorderStyleAction {
	type: StyleActionTypes.TOGGLE_BORDER
}

export type StyleAction = ResetStyleAction | UpdateStyleAction | ToggleBorderStyleAction

const initialState: StyleState = {
	aliveColor: "#34d399",
	deadColor: "#e5e7eb",
	borderColor: "#6b7280",
	border: true,
}

export const styleReducer = (state = initialState, action: StyleAction): StyleState => {
	switch (action.type) {
		case StyleActionTypes.RESET_STYLES:
			return { ...state, ...initialState }
		case StyleActionTypes.UPDATE_STYLES:
			return state

		case StyleActionTypes.TOGGLE_BORDER:
			return state

		default:
			return state
	}
}
