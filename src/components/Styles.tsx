import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react"
import { useActions } from "../redux/hooks/useActions"
import { useTypedSelector } from "../redux/hooks/useTypedSelector"

export default function Styles() {
	const { aliveColor, deadColor, borderColor, border } = useTypedSelector((state) => state.style)

	const { updateStyles, resetStyles } = useActions()

	const [stateAliveColor, setStateAliveColor] = useState(aliveColor)
	const [stateDeadColor, setStateDeadColor] = useState(deadColor)
	const [stateBorderColor, setStateBorderColor] = useState(borderColor)
	const [stateBorder, setStateBorder] = useState(border)

	const handleAliveColorChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStateAliveColor(e.target.value)
	}

	const handleDeadColorChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStateDeadColor(e.target.value)
	}

	const handleBorderColorChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStateBorderColor(e.target.value)
	}

	const handleBorderChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStateBorder(e.target.checked)
	}

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		updateStyles(stateAliveColor, stateDeadColor, stateBorderColor, stateBorder)
	}

	const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		resetStyles()
		setStateAliveColor("#34d399")
		setStateDeadColor("#e5e7eb")
		setStateBorderColor("#6b7280")
		setStateBorder(true)
	}

	return (
		<div
			className="absolute w-96 -left-48 bg-gray-100 rounded-2xl pointer-events-auto p-4 text-lg font-semibold"
			style={{ top: "-330px" }}
		>
			<form>
				<div className="mb-2">
					<div className="flex justify-between ">
						<label>Alive Cell Color: </label>
						<span style={{ color: stateAliveColor }}>{stateAliveColor.toUpperCase()}</span>
					</div>
					<div className="flex items-center justify-between mt-1">
						<input
							className="appearance-none w-24 rounded-2xl px-3 focus:outline-none"
							type="text"
							value={stateAliveColor}
							onChange={handleAliveColorChange}
							maxLength={7}
							minLength={4}
						/>
						<span
							onClick={() => setStateAliveColor("#ef4444")}
							className="bg-red-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateAliveColor("#f59e0b")}
							className="bg-yellow-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateAliveColor("#10b981")}
							className="bg-green-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateAliveColor("#3b82f6")}
							className="bg-blue-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateAliveColor("#6366f1")}
							className="bg-indigo-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateAliveColor("#8b5cf6")}
							className="bg-purple-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateAliveColor("#ec4899")}
							className="bg-pink-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
					</div>
				</div>

				<div className="mb-2">
					<div className="flex justify-between ">
						<label>Dead Cell Color: </label>
						<span style={{ color: stateDeadColor }}>{stateDeadColor.toUpperCase()}</span>
					</div>
					<div className="flex items-center justify-between mt-1">
						<input
							className="appearance-none w-24 rounded-2xl px-3 focus:outline-none"
							type="text"
							value={stateDeadColor}
							onChange={handleDeadColorChange}
							maxLength={7}
							minLength={4}
						/>
						<span
							onClick={() => setStateDeadColor("#ef4444")}
							className="bg-red-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateDeadColor("#f59e0b")}
							className="bg-yellow-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateDeadColor("#10b981")}
							className="bg-green-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateDeadColor("#3b82f6")}
							className="bg-blue-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateDeadColor("#6366f1")}
							className="bg-indigo-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateDeadColor("#8b5cf6")}
							className="bg-purple-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateDeadColor("#ec4899")}
							className="bg-pink-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
					</div>
				</div>

				<div className="mb-2">
					<div className="flex justify-between ">
						<label>Border Cell Color: </label>
						<span style={{ color: stateBorderColor }}>{stateBorderColor.toUpperCase()}</span>
					</div>
					<div className="flex items-center justify-between mt-1">
						<input
							className="appearance-none w-24 rounded-2xl px-3 focus:outline-none"
							type="text"
							value={stateBorderColor}
							onChange={handleBorderColorChange}
							maxLength={7}
							minLength={4}
						/>
						<span
							onClick={() => setStateBorderColor("#ef4444")}
							className="bg-red-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateBorderColor("#f59e0b")}
							className="bg-yellow-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateBorderColor("#10b981")}
							className="bg-green-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateBorderColor("#3b82f6")}
							className="bg-blue-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateBorderColor("#6366f1")}
							className="bg-indigo-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateBorderColor("#8b5cf6")}
							className="bg-purple-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
						<span
							onClick={() => setStateBorderColor("#ec4899")}
							className="bg-pink-500 w-6 h-6 rounded-full cursor-pointer"
						></span>
					</div>
				</div>

				<div className="mb-2">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-4">
							<label>Border Enabled: </label>
							<input
								className="form-checkbox h-5 w-5 rounded-2xl px-3"
								type="checkbox"
								checked={stateBorder}
								onChange={handleBorderChange}
							/>
						</div>
						<span>{stateBorder ? "YES" : "NO"}</span>
					</div>
				</div>

				<div className="flex space-x-4">
					<button className="w-full rounded-2xl bg-green-400 text-base focus:outline-none" onClick={handleSubmit}>
						APPLY
					</button>
					<button className="w-full rounded-2xl bg-red-400 text-base focus:outline-none" onClick={handleReset}>
						RESET TO DEFAULT
					</button>
				</div>
			</form>
		</div>
	)
}
