import { GridAction, GridActionTypes } from "../reducers/gridReducer"

export function clearGrid(): GridAction {
	return {
		type: GridActionTypes.CLEAR_GRID,
	}
}

export function setGrid(grid: boolean[][]): GridAction {
	return {
		type: GridActionTypes.SET_GRID,
		grid: grid,
	}
}

export function upsizeGrid(rows: number, columns: number): GridAction {
	return {
		type: GridActionTypes.UPSIZE_GRID,
		rows: rows,
		columns: columns,
	}
}

export function addRows(by: number): GridAction {
	return {
		type: GridActionTypes.ADD_ROWS,
		by: by,
	}
}

export function addColumns(by: number): GridAction {
	return {
		type: GridActionTypes.ADD_COLUMNS,
		by: by,
	}
}

export function flipCell(row: number, column: number): GridAction {
	return {
		type: GridActionTypes.FLIP_CELL,
		row: row,
		column: column,
	}
}
