interface GridState {
	grid: boolean[][]
}

export enum GridActionTypes {
	SET_GRID = "SET_GRID",
	UPSIZE_GRID = "UPSIZE_GRID",
	DOWNSIZE_GRID = "DOWNSIZE_GRID",
	CLEAR_GRID = "CLEAR_GRID",
	ADD_ROWS = "ADD_ROWS",
	ADD_COLUMNS = "ADD_COLUMNS",
	FLIP_CELL = "FLIP_CELL",
	SIMULATE = "SIMULATE",
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

interface SimulateGridAction {
	type: GridActionTypes.SIMULATE
}

export type GridAction =
	| SetGridAction
	| UpsizeGridAction
	| DownsizeGridAction
	| ClearGridAction
	| AddRowsGridAction
	| AddColumnsGridAction
	| FlipCellGridAction
	| SimulateGridAction

const initialState: GridState = {
	grid: [],
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

			return { ...state, grid: newGrid }
		}

		// x3
		case GridActionTypes.CLEAR_GRID: {
			let newGrid: Array<Array<boolean>> = []

			state.grid.forEach((row) => {
				newGrid.push(row.slice())
			})

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
			let newGrid: Array<Array<boolean>> = []

			state.grid.forEach((row) => {
				newGrid.push(row.slice())
			})

			newGrid[action.row]![action.column] = !state.grid[action.row]![action.column]

			return { ...state, grid: newGrid }
		}

		// x7
		case GridActionTypes.SIMULATE: {
			const positions = [
				[0, 1],
				[0, -1],
				[1, -1],
				[-1, 1],
				[1, 1],
				[-1, -1],
				[1, 0],
				[-1, 0],
			]

			let newGrid: Array<Array<boolean>> = []

			state.grid.forEach((row) => {
				newGrid.push(row.slice())
			})

			let currentRows = state.grid.length
			let currentColumns = 0
			if (state.grid[0] !== undefined) {
				currentColumns = state.grid[0].length
			}

			for (let r = 0; r < currentRows; r++) {
				for (let c = 0; c < currentColumns; c++) {
					let neighbours = 0

					// if (state.grid[r]![c]) {
					// 	neighbours = 1
					// }

					positions.forEach(([i, j]) => {
						let newRow = r + i!
						let newCol = c + j!
						if (newRow >= 0 && newRow < currentRows && newCol >= 0 && newCol < currentColumns) {
							if (state.grid[newRow]![newCol]) {
								neighbours++
							}
						}
					})
					if (neighbours < 2 || neighbours > 3) {
						newGrid[r]![c] = false
					} else if (state.grid[r]![c] === false && neighbours === 3) {
						newGrid[r]![c] = true
					}
				}
			}

			return { ...state, grid: newGrid }
		}

		default:
			return state
	}
}
