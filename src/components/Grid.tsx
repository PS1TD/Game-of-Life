import React, { useEffect, useRef, useState } from "react"
import Cell from "./Cell"

export default function Grid() {
	const [rows, setRows] = useState(10)
	const [columns, setColumns] = useState(20)

	const [grid, setGrid] = useState<Array<Array<boolean>>>(Array.from(Array(rows), () => Array(columns).fill(false)))

	const rowLoader = useRef(null)
	const columnLoader = useRef(null)

	useEffect(() => {
		var options = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
		}
		const observer = new IntersectionObserver(handleObserver, options)
		if (rowLoader.current && columnLoader.current) {
			observer.observe(rowLoader.current!)
			observer.observe(columnLoader.current!)
		}
	}, [])

	useEffect(() => {
		console.log("ADD MORE ROWS")
		const newGrid = Array.from(Array(rows), () => Array(columns).fill(false))
		setGrid(newGrid)
	}, [rows])

	useEffect(() => {
		console.log("ADD MORE COLUMNS")
		const newGrid = Array.from(Array(rows), () => Array(columns).fill(false))
		setGrid(newGrid)
	}, [columns])

	const handleObserver = (entities: any) => {
		console.log(entities)
		entities.forEach((entity: any) => {
			if (entity.isIntersecting) {
				if (entity.target.id === "rowLoader") {
					console.log("ROWS HIT")
					setRows((rows) => rows + 10)
				} else if (entity.target.id === "columnLoader") {
					console.log("COLUMNS HIT")
					setColumns((columns) => columns + 10)
				}
			}
		})
	}

	return (
		<>
			<div className="flex flex-col" style={{ width: `${columns * 100}px` }}>
				<div className="flex">
					<div>
						{grid.map((row, r) => {
							{
								return (
									<div key={r} className="flex">
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
					<div id="columnLoader" ref={columnLoader}></div>
				</div>
				<div id="rowLoader" className="flex" ref={rowLoader}></div>
			</div>
		</>
	)
}
