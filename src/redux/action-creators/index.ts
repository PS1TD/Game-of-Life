import * as GridActionCreators from "../action-creators/grid"
import * as StyleActionCreators from "../action-creators/style"
import * as SettingsActionCreators from "../action-creators/settings"

export default {
	...GridActionCreators,
	...StyleActionCreators,
	...SettingsActionCreators,
}
