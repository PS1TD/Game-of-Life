import React, { useCallback, useEffect, useRef } from "react"
import { useActions } from "../redux/hooks/useActions"
import { useTypedSelector } from "../redux/hooks/useTypedSelector"

export default function Dashboard() {
	const { running, speed, size } = useTypedSelector((state) => state.settings)

	const { toggleRunning, downsizeGrid, clearGrid, simulateGrid } = useActions()

	const runningRef = useRef(running)
	runningRef.current = running

	const runSimulation = useCallback(() => {
		if (!runningRef.current) {
			return
		}

		simulateGrid()

		setTimeout(runSimulation, speed)
	}, [])

	useEffect(() => {
		if (running) {
			runSimulation()
		}
	}, [])

	return (
		<div className="fixed bottom-0 w-full pointer-events-none">
			<div className="flex justify-around mb-16">
				<button
					onClick={() => {
						toggleRunning()
						if (!running) {
							runningRef.current = true
							runSimulation()
						}
					}}
					className="bg-green-400 p-6 rounded-full pointer-events-auto"
				>
					{running ? "STOP" : "START"}
				</button>
				<button onClick={() => clearGrid()} className="bg-red-400 p-6 rounded-full pointer-events-auto">
					CLEAR
				</button>
				<button
					onClick={() => {
						downsizeGrid(Math.ceil(window.innerHeight / size), Math.ceil(window.innerWidth / size))
					}}
					className="bg-red-400 p-6 rounded-full pointer-events-auto"
				>
					RESET SIZE
				</button>
				<button className="bg-blue-400 p-6 rounded-full pointer-events-auto">UPLOAD</button>
				<button className="bg-yellow-400 p-6 rounded-full pointer-events-auto">DOWNLOAD</button>
			</div>
		</div>
	)
}
