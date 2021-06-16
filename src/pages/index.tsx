import React from "react"
import { Provider } from "react-redux"
import Dashboard from "../components/Dashboard"
import Grid from "../components/Grid"
import { store } from "../redux/store"

export default function index() {
	return (
		<Provider store={store}>
			<Grid />
			<Dashboard />
		</Provider>
	)
}
