interface SettingsState {
	size: number
	running: boolean
	speed: number
}

export enum SettingsActionTypes {
	SET_SPEED = "SET_SPEED",
	TOGGLE_RUNNING = "TOGGLE_RUNNING",
	SET_SIZE = "SET_SIZE",
	RESET_SETTINGS = "RESET_SETTINGS",
}

interface ToggleRunningSettingsAction {
	type: SettingsActionTypes.TOGGLE_RUNNING
}

interface SetSpeedSettingsAction {
	type: SettingsActionTypes.SET_SPEED
	speed: number
}

interface SetSizeSettingsAction {
	type: SettingsActionTypes.SET_SIZE
	size: number
}

interface ResetSettingsAction {
	type: SettingsActionTypes.RESET_SETTINGS
}

export type SettingsAction = ToggleRunningSettingsAction | SetSpeedSettingsAction | SetSizeSettingsAction | ResetSettingsAction

const initialState: SettingsState = {
	speed: 200,
	size: 40,
	running: false,
}

export const settingsReducer = (state = initialState, action: SettingsAction): SettingsState => {
	switch (action.type) {
		case SettingsActionTypes.TOGGLE_RUNNING: {
			return { ...state, running: !state.running }
		}

		case SettingsActionTypes.SET_SPEED:
			return { ...state, speed: action.speed }

		case SettingsActionTypes.SET_SIZE:
			return { ...state, size: action.size }

		case SettingsActionTypes.RESET_SETTINGS:
			return { ...state, ...initialState }

		default:
			return state
	}
}
