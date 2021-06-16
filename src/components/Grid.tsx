import React, { useEffect, useRef, useState } from "react"
import Cell from "./Cell"

export default function Grid() {
	const [rows, setRows] = useState(30)
	const [columns, setColumns] = useState(50)

	const [grid, setGrid] = useState<Array<Array<boolean>>>(Array.from(Array(rows), () => Array(columns).fill(false)))

	const rowLoader = useRef(null)

	useEffect(() => {
		var options = {
			root: null,
			rootMargin: "20px",
			threshold: 1.0,
		}
		const rowObserver = new IntersectionObserver(handleRowObserver, options)
		if (rowLoader.current) {
			rowObserver.observe(rowLoader.current!)
		}
	}, [])

	useEffect(() => {
		console.log("ADD MORE ROWS")
		const newGrid = Array.from(Array(rows), () => Array(columns).fill(false))
		setGrid(newGrid)
	}, [rows])

	const handleRowObserver = (entities: any) => {
		const target = entities[0]
		if (target.isIntersecting) {
			console.log("HIT")
			setRows((rows) => rows + 1)
		}
	}

	return (
		<>
			<div>
				{grid.map((row, r) => {
					{
						return (
							<div className="block whitespace-nowrap">
								{row.map((cell, c) => {
									{
										return <Cell key={r + "-" + c} row={r} column={c} />
									}
								})}
							</div>
						)
					}
				})}
			</div>
			<div ref={rowLoader}></div>
		</>
	)
}
