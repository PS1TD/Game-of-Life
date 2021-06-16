import React from "react"

type CellProps = {
	row: number
	column: number
	size: number
}

export default function Cell({ row, column, size }: CellProps) {
	return (
		<div className="inline-block bg-gray-200 border border-gray-500" style={{ width: `${size}px`, height: `${size}px` }}>
			{row}-{column}
		</div>
	)
}
