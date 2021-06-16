interface SettingsState {
	speed: number
}

export enum SettingsActionTypes {
	SET_SPEED = "SET_SPEED",
}

interface SetSpeedSettingsAction {
	type: SettingsActionTypes.SET_SPEED
	speed: number
}

export type SettingsAction = SetSpeedSettingsAction

const initialState: SettingsState = {
	speed: 1000,
}

export const settingsReducer = (state = initialState, action: SettingsAction): SettingsState => {
	switch (action.type) {
		case SettingsActionTypes.SET_SPEED:
			return { ...state, speed: action.speed }
		default:
			return state
	}
}
