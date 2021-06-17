import { SettingsAction, SettingsActionTypes } from "../reducers/settingsReducer"

export function toggleRunning(): SettingsAction {
	return {
		type: SettingsActionTypes.TOGGLE_RUNNING,
	}
}

export function setSpeed(speed: number): SettingsAction {
	return {
		type: SettingsActionTypes.SET_SPEED,
		speed: speed,
	}
}

export function setSize(size: number): SettingsAction {
	return {
		type: SettingsActionTypes.SET_SIZE,
		size: size,
	}
}
