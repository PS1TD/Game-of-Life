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
	const { aliveColor, borderColor, deadColor, border } = useTypedSelector((state) => state.style)

	const { flipCell } = useActions()

	return (
		<div
			className={`inline-block  ${border && "border"}`}
			style={{
				width: `${size}px`,
				height: `${size}px`,
				backgroundColor: grid[row]![column] ? aliveColor : deadColor,
				borderColor: borderColor,
			}}
			onClick={() => flipCell(row, column)}
		></div>
	)
}
