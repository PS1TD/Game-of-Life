import React from "react"
import { useActions } from "../redux/hooks/useActions"
import { useTypedSelector } from "../redux/hooks/useTypedSelector"

export default function Dashboard() {
	const { size } = useTypedSelector((state) => state.grid)

	const { downsizeGrid, clearGrid } = useActions()

	return (
		<div className="fixed bottom-0 w-full pointer-events-none">
			<div className="flex justify-around mb-16">
				<button onClick={() => console.log("CLICK")} className="bg-green-400 p-6 rounded-full pointer-events-auto">
					START/STOP
				</button>
				<button onClick={() => clearGrid()} className="bg-red-400 p-6 rounded-full pointer-events-auto">
					CLEAR
				</button>
				<button
					onClick={() => {
						console.log(Math.ceil(window.innerHeight / size))
						console.log(Math.ceil(window.innerWidth / size))
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
