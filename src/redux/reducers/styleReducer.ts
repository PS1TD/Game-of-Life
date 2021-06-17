interface StyleState {
	deadColor: string
	aliveColor: string
	borderColor: string
	border: boolean
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
	deadColor: string | undefined
	aliveColor: string | undefined
	borderColor: string | undefined
	border: boolean | undefined
}

export type StyleAction = ResetStyleAction | UpdateStyleAction

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
		case StyleActionTypes.UPDATE_STYLES: {
			return {
				...state,
				aliveColor: action.aliveColor ?? state.aliveColor,
				deadColor: action.deadColor ?? state.deadColor,
				borderColor: action.borderColor ?? state.borderColor,
				border: action.border ?? state.border,
			}
		}

		default:
			return state
	}
}
