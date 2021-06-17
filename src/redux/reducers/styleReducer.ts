interface StyleState {
	deadColor: string
	aliveColor: string
	borderColor: string
}

export enum StyleActionTypes {
	RESET_STYLES = "RESET_STYLES",
	UPDATE_STYLES = "UPDATE_STYLES",
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

export type StyleAction = ResetStyleAction | UpdateStyleAction

const initialState: StyleState = {
	aliveColor: "#34d399",
	deadColor: "#e5e7eb",
	borderColor: "#6b7280",
}

export const styleReducer = (state = initialState, action: StyleAction): StyleState => {
	switch (action.type) {
		case StyleActionTypes.RESET_STYLES:
			return { ...state, ...initialState }
		case StyleActionTypes.UPDATE_STYLES:
			return state
		default:
			return state
	}
}
