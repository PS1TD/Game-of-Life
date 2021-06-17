import React, { useEffect, useRef, useState } from "react"
import { useActions } from "../redux/hooks/useActions"
import { useTypedSelector } from "../redux/hooks/useTypedSelector"
import Cell from "./Cell"

export default function Grid() {
	const EXPAND_BY = 10

	const { grid } = useTypedSelector((state) => state.grid)
	const { size } = useTypedSelector((state) => state.settings)

	const { upsizeGrid, addRows, addColumns } = useActions()

	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	})

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
		let currentRows = grid.length
		let currentColumns = 0
		if (grid[0] !== undefined) {
			currentColumns = grid[0].length
		}

		upsizeGrid(
			Math.max(currentRows, Math.ceil(window.innerHeight / size)),
			Math.max(currentColumns, Math.ceil(window.innerWidth / size))
		)
	}, [windowSize])

	const rowLoader = useRef<HTMLDivElement>(null)
	const columnLoader = useRef<HTMLDivElement>(null)

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

	const handleObserver = (entities: IntersectionObserverEntry[]) => {
		entities.forEach((entity: IntersectionObserverEntry) => {
			if (entity.isIntersecting) {
				if (entity.target.id === "rowLoader") {
					addRows(EXPAND_BY)
				} else if (entity.target.id === "columnLoader") {
					addColumns(EXPAND_BY)
				}
			}
		})
	}

	return (
		<>
			<div
				className="flex flex-col"
				style={{
					width: `${() => {
						let currentColumns = 0
						if (grid[0] !== undefined) {
							currentColumns = grid[0].length
						}

						return currentColumns * size
					}}px`,
				}}
			>
				<div className="flex">
					<div>
						{grid.map((row, r) => {
							{
								return (
									<div key={r} className="flex">
										{row.map((_, c) => {
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
