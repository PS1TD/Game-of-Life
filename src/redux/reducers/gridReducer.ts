interface GridState {
	grid: boolean[][]
	size: number
	running: boolean
}

export enum GridActionTypes {
	SET_GRID = "SET_GRID",
	UPSIZE_GRID = "UPSIZE_GRID",
	DOWNSIZE_GRID = "DOWNSIZE_GRID",
	CLEAR_GRID = "CLEAR_GRID",
	ADD_ROWS = "ADD_ROWS",
	ADD_COLUMNS = "ADD_COLUMNS",
	FLIP_CELL = "FLIP_CELL",
	TOGGLE_RUNNING = "TOGGLE_RUNNING",
}

interface SetGridAction {
	type: GridActionTypes.SET_GRID
	grid: boolean[][]
}

interface UpsizeGridAction {
	type: GridActionTypes.UPSIZE_GRID
	rows: number
	columns: number
}

interface DownsizeGridAction {
	type: GridActionTypes.DOWNSIZE_GRID
	rows: number
	columns: number
}

interface ClearGridAction {
	type: GridActionTypes.CLEAR_GRID
}

interface AddRowsGridAction {
	type: GridActionTypes.ADD_ROWS
	by: number
}

interface AddColumnsGridAction {
	type: GridActionTypes.ADD_COLUMNS
	by: number
}

interface FlipCellGridAction {
	type: GridActionTypes.FLIP_CELL
	row: number
	column: number
}

interface ToggleRunningGridAction {
	type: GridActionTypes.TOGGLE_RUNNING
}

export type GridAction =
	| SetGridAction
	| UpsizeGridAction
	| DownsizeGridAction
	| ClearGridAction
	| AddRowsGridAction
	| AddColumnsGridAction
	| FlipCellGridAction
	| ToggleRunningGridAction

const initialState: GridState = {
	grid: [],
	size: 50,
	running: false,
}

export const gridReducer = (state = initialState, action: GridAction): GridState => {
	switch (action.type) {
		case GridActionTypes.SET_GRID:
			return { ...state, grid: action.grid }

		// Not elegant but who cares. Laughing in O(n^2)
		// Also technically incorrect redux code as I am mutating state causing unnecessary rerenders

		case GridActionTypes.UPSIZE_GRID: {
			let newGrid = Array.from(Array(action.rows), () => Array(action.columns).fill(false))

			let i = 0
			state.grid.forEach((row) => {
				let j = 0

				if (row) {
					row.forEach(() => {
						if (state.grid[i]) {
							newGrid[i]![j] = state.grid[i]![j]
						}
						j++
					})
				}
				i++
			})

			return { ...state, grid: newGrid }
		}

		// x2
		case GridActionTypes.DOWNSIZE_GRID: {
			let newGrid = Array.from(Array(action.rows), () => Array(action.columns).fill(false))

			let i = 0
			newGrid.forEach((row) => {
				let j = 0
				row.forEach(() => {
					newGrid[i]![j] = state.grid[i]![j]

					j++
				})

				i++
			})

			console.log(newGrid)

			return { ...state, grid: newGrid }
		}

		// x3
		case GridActionTypes.CLEAR_GRID: {
			let newGrid = state.grid

			let i = 0
			state.grid.forEach((row) => {
				let j = 0
				row.forEach(() => {
					newGrid[i]![j] = false
					j++
				})
				i++
			})

			return { ...state, grid: newGrid }
		}
		// x4
		case GridActionTypes.ADD_ROWS: {
			let newGrid = Array.from(Array(state.grid.length + action.by), () => Array(state.grid[0]!.length).fill(false))

			let i = 0
			state.grid.forEach((row) => {
				let j = 0
				row.forEach(() => {
					newGrid[i]![j] = state.grid[i]![j]
					j++
				})
				i++
			})

			return { ...state, grid: newGrid }
		}
		// x5
		case GridActionTypes.ADD_COLUMNS: {
			let newGrid = Array.from(Array(state.grid.length), () => Array(state.grid[0]!.length + action.by).fill(false))

			let i = 0
			state.grid.forEach((row) => {
				let j = 0
				row.forEach(() => {
					newGrid[i]![j] = state.grid[i]![j]
					j++
				})
				i++
			})

			return { ...state, grid: newGrid }
		}
		// x6
		case GridActionTypes.FLIP_CELL: {
			let newGrid = state.grid

			newGrid[action.row]![action.column] = !newGrid[action.row]![action.column]

			return { ...state, grid: newGrid }
		}

		case GridActionTypes.TOGGLE_RUNNING: {
			return { ...state, running: !state.running }
		}

		default:
			return state
	}
}
