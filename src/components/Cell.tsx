import React from "react"

type CellProps = {
	row: number
	column: number
}

export default function Cell({ row, column }: CellProps) {
	return (
		<div className="inline-block bg-gray-200 border border-gray-500" style={{ width: "100px", height: "100px" }}>
			{row}-{column}
		</div>
	)
}
