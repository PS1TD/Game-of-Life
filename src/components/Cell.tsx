import React from "react"
import { useActions } from "../redux/hooks/useActions"
import { useTypedSelector } from "../redux/hooks/useTypedSelector"

type CellProps = {
	row: number
	column: number
}

export default function Cell({ row, column }: CellProps) {
	const { grid } = useTypedSelector((state) => state.grid)
	const { size } = useTypedSelector((state) => state.settings)

	const { flipCell } = useActions()

	return (
		<div
			className={`inline-block ${grid[row]![column] ? "bg-green-500" : "bg-gray-200"} border border-gray-500`}
			style={{ width: `${size}px`, height: `${size}px` }}
			onClick={() => flipCell(row, column)}
		>
			{row}-{column}
		</div>
	)
}
