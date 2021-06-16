import React, { useEffect, useRef, useState } from "react"
import Cell from "./Cell"

export default function Grid() {
	const [rows, setRows] = useState(1)
	const [columns, setColumns] = useState(2)

	const [grid, setGrid] = useState<Array<Array<boolean>>>(Array.from(Array(rows), () => Array(columns).fill(false)))

	const rowLoader = useRef(null)

	useEffect(() => {
		var options = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
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
		console.log(target)
		if (target.isIntersecting) {
			console.log("ROWS HIT")
			setRows((rows) => rows + 10)
		}
	}

	const columnLoader = useRef(null)

	useEffect(() => {
		var options = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
		}
		const columnObserver = new IntersectionObserver(handleColumnObserver, options)
		if (columnLoader.current) {
			columnObserver.observe(columnLoader.current!)
		}
	}, [])

	useEffect(() => {
		console.log("ADD MORE COLUMNS")
		const newGrid = Array.from(Array(rows), () => Array(columns).fill(false))
		setGrid(newGrid)
	}, [columns])

	const handleColumnObserver = (entities: any) => {
		const target = entities[0]
		if (target.isIntersecting) {
			console.log("COLUMNS HIT")
			setColumns((columns) => columns + 10)
		}
	}

	return (
		<>
			<div className="flex flex-col" style={{ width: `${columns * 100}px` }}>
				<div className="flex">
					<div>
						{grid.map((row, r) => {
							{
								return (
									<div className="flex">
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
					<div ref={columnLoader}></div>
				</div>
				<div className="flex" ref={rowLoader}></div>
			</div>
		</>
	)
}
