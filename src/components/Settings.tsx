import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react"
import { useActions } from "../redux/hooks/useActions"
import { useTypedSelector } from "../redux/hooks/useTypedSelector"

export default function Settings() {
	const { grid } = useTypedSelector((state) => state.grid)
	const { speed, size } = useTypedSelector((state) => state.settings)

	const { setSpeed, setSize, upsizeGrid, resetSettings } = useActions()

	const [stateSpeed, setStateSpeed] = useState(speed)
	const [stateSize, setStateSize] = useState(size)

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

	const handleSpeedChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStateSpeed(+e.target.value)
	}

	const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStateSize(+e.target.value)
	}

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setSize(stateSize)
		setSpeed(stateSpeed)

		let currentRows = grid.length
		let currentColumns = 0
		if (grid[0] !== undefined) {
			currentColumns = grid[0].length
		}

		upsizeGrid(
			Math.max(currentRows, Math.ceil(windowSize.height / stateSize)),
			Math.max(currentColumns, Math.ceil(windowSize.width / stateSize))
		)
	}

	const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		resetSettings()
		setStateSize(40)
		setStateSpeed(200)
	}

	return (
		<div
			className="absolute w-96 -left-48 bg-gray-100 rounded-2xl pointer-events-auto p-4 text-lg font-semibold"
			style={{ top: "-220px" }}
		>
			<form>
				<div className="flex justify-between ">
					<label>Iteration Time: </label>
					<span>{stateSpeed} ms</span>
				</div>
				<input
					className="appearance-none w-full rounded-2xl mb-4"
					type="range"
					min="50"
					max="5000"
					value={stateSpeed}
					onChange={handleSpeedChange}
					step="20"
				/>

				<div className="flex justify-between ">
					<label>Cell Size: </label>
					<span>{stateSize} px</span>
				</div>
				<input
					className="appearance-none w-full rounded-2xl mb-4"
					type="range"
					min="10"
					max="200"
					value={stateSize}
					onChange={handleSizeChange}
					step="5"
				/>

				<div className="flex space-x-4">
					<button className="w-full rounded-2xl bg-green-400 text-base focus:outline-none" onClick={handleSubmit}>
						SAVE
					</button>
					<button className="w-full rounded-2xl bg-red-400 text-base focus:outline-none" onClick={handleReset}>
						RESET TO DEFAULT
					</button>
				</div>
			</form>
		</div>
	)
}
