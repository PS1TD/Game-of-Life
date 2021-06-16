import React from "react"

export default function Dashboard() {
	return (
		<div className="fixed bottom-0 w-full pointer-events-none">
			<div className="flex justify-around mb-16">
				<button className="bg-green-400 p-6 rounded-full">START/STOP</button>
				<button className="bg-red-400 p-6 rounded-full">CLEAR</button>
				<button className="bg-blue-400 p-6 rounded-full">UPLOAD</button>
				<button className="bg-yellow-400 p-6 rounded-full">DOWNLOAD</button>
			</div>
		</div>
	)
}
