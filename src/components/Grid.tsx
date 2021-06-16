import React, { useEffect, useRef, useState } from "react"
import Cell from "./Cell"

export default function Grid() {
	type NonEmptyArray<T> = [T, ...T[]]

	const EXPAND_BY = 10

	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	})

	const [cellSize, setCellSize] = useState(100)

	const [rows, setRows] = useState(Math.ceil(window.innerHeight / cellSize))
	const [columns, setColumns] = useState(Math.ceil(window.innerWidth / cellSize))

	const [grid, setGrid] = useState<Array<Array<boolean>>>(Array.from(Array(rows), () => Array(columns).fill(false)))

	const rowLoader = useRef<HTMLDivElement>(null)
	const columnLoader = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}
		window.addEventListener("resize", handleResize)
		handleResize()
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	useEffect(() => {
		console.log("WINDOW SIZE CHANGED")
		setRows((rows) => Math.max(rows, Math.ceil(windowSize.height / cellSize)))
		setColumns((columns) => Math.max(columns, Math.ceil(windowSize.width / cellSize)))
	}, [windowSize])

	useEffect(() => {
		var options = {
			root: null,
			rootMargin: "30px",
			threshold: 0,
		}
		const observer = new IntersectionObserver(handleObserver, options)
		if (rowLoader.current && columnLoader.current) {
			observer.observe(rowLoader.current)
			observer.observe(columnLoader.current)
		}
	}, [])

	useEffect(() => {
		// setGrid((grid) => {
		// 	grid.length = rows

		// 	console.log(grid)

		// 	let counter = 0
		// 	grid.forEach(() => counter++)
		// 	console.log(counter)
		// 	return grid
		// })

		setGrid((grid) => {
			const newGrid = Array.from(Array(rows), () => Array(columns).fill(false))

			let i = 0
			grid.forEach((row) => {
				let j = 0
				row.forEach((cell) => {
					newGrid[i]![j] = cell
					j++
				})
				i++
			})

			return newGrid
		})
	}, [rows])

	useEffect(() => {
		setGrid((grid) => {
			const newGrid = Array.from(Array(rows), () => Array(columns).fill(false))

			let i = 0
			grid.forEach((row) => {
				let j = 0
				row.forEach((cell) => {
					newGrid[i]![j] = cell
					j++
				})
				i++
			})

			return newGrid
		})
	}, [columns])

	const handleObserver = (entities: IntersectionObserverEntry[]) => {
		entities.forEach((entity: IntersectionObserverEntry) => {
			if (entity.isIntersecting) {
				if (entity.target.id === "rowLoader") {
					setRows((rows) => rows + EXPAND_BY)
				} else if (entity.target.id === "columnLoader") {
					setColumns((columns) => columns + EXPAND_BY)
				}
			}
		})
	}

	return (
		<>
			<div className="flex flex-col" style={{ width: `${columns * cellSize}px` }}>
				<div className="flex">
					<div>
						{grid.map((row, r) => {
							{
								return (
									<div key={r} className="flex">
										{row.map((cell, c) => {
											{
												return <Cell key={r + "-" + c} row={r} column={c} size={cellSize} />
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
