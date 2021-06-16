import { SettingsAction, SettingsActionTypes } from "../reducers/settingsReducer"

export function setSpeedStyles(speed: number): SettingsAction {
	return {
		type: SettingsActionTypes.SET_SPEED,
		speed: speed,
	}
}
