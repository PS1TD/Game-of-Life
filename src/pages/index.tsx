import React from "react"
import { Provider } from "react-redux"
import Dashboard from "../components/Dashboard"
import Grid from "../components/Grid"
import { store, persistor } from "../redux/store"

import { PersistGate } from "redux-persist/integration/react"

export default function index() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Grid />
				<Dashboard />
			</PersistGate>
		</Provider>
	)
}
