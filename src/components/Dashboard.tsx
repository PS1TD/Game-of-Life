import Settings from "./Settings"
import Styles from "./Styles"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useActions } from "../redux/hooks/useActions"
import { useTypedSelector } from "../redux/hooks/useTypedSelector"

export default function Dashboard() {
	const { running, speed, size } = useTypedSelector((state) => state.settings)

	const { toggleRunning, downsizeGrid, clearGrid, simulateGrid } = useActions()

	const [showSettings, setShowSettings] = useState(false)
	const [showStyles, setShowStyles] = useState(false)

	const [showDashboard, setShowDashboard] = useState(true)

	const runningRef = useRef(running)
	runningRef.current = running

	const speedRef = useRef(speed)
	speedRef.current = speed

	const runSimulation = useCallback(() => {
		if (!runningRef.current) {
			return
		}

		simulateGrid()

		setTimeout(runSimulation, speedRef.current)
	}, [])

	useEffect(() => {
		if (running) {
			runSimulation()
		}
	}, [])

	return (
		<>
			<div className="fixed bottom-0 w-full pointer-events-none">
				<div className="mb-16 text-xl font-semibold text-gray-800">
					{showDashboard ? (
						<div className="flex justify-around ">
							<button
								onClick={() => {
									toggleRunning()
									if (!running) {
										runningRef.current = true
										runSimulation()
									}
								}}
								className={` ${
									running ? "bg-yellow-400" : "bg-green-400"
								} focus:outline-none p-4 rounded-full pointer-events-auto`}
							>
								{running ? (
									<div className="flex flex-row justify-center items-center">
										<svg
											className=" h10 w-10 fill-current"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="48px"
										>
											<path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z" />
										</svg>
										<span className="ml-6  mr-2">PAUSE</span>
									</div>
								) : (
									<div className="flex flex-row justify-center items-center">
										<svg
											className=" h10 w-10 fill-current "
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="48px"
										>
											<path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
										</svg>
										<span className="ml-6 mr-2">START</span>
									</div>
								)}
							</button>

							<div className="flex space-x-8">
								<button
									onClick={() => clearGrid()}
									className=" bg-red-400 focus:outline-none p-4 rounded-full pointer-events-auto"
								>
									<div className="flex flex-row justify-center items-center">
										<svg
											className=" h10 w-10 fill-current "
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="48px"
										>
											<path d="M0 0h24v24H0V0z" fill="none" />
											<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
										</svg>
										<span className="ml-6 mr-2">CLEAR</span>
									</div>
								</button>
								<button
									onClick={() => {
										downsizeGrid(Math.ceil(window.innerHeight / size), Math.ceil(window.innerWidth / size))
									}}
									className="bg-purple-400 focus:outline-none p-4 rounded-full pointer-events-auto"
								>
									<div className="flex flex-row justify-center items-center">
										<svg
											className=" h10 w-10 fill-current "
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="48px"
										>
											<path d="M0 0h24v24H0V0z" fill="none" />
											<path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H5c-.55 0-1-.45-1-1v-3h4v4zm0-6H4v-4h4v4zm0-6H4V5c0-.55.45-1 1-1h3v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm5 12h-3v-4h4v3c0 .55-.45 1-1 1zm1-6h-4v-4h4v4zm0-6h-4V4h3c.55 0 1 .45 1 1v3z" />
										</svg>
										<span className="ml-6 mr-2">RESET GRID SIZE</span>
									</div>
								</button>
							</div>
							<div className="flex space-x-8">
								<button className=" bg-blue-400 focus:outline-none p-4 rounded-full pointer-events-auto">
									<div className="flex flex-row justify-center items-center">
										<svg
											className=" h10 w-10 fill-current "
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="48px"
										>
											<g>
												<rect fill="none" height="24" width="24" />
											</g>
											<g>
												<path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" />
											</g>
										</svg>
										<span className="ml-6 mr-2">UPLOAD TEMPLATE</span>
									</div>
								</button>
								<button className=" bg-yellow-400 focus:outline-none p-4 rounded-full pointer-events-auto">
									<div className="flex flex-row justify-center items-center">
										<svg
											className=" h10 w-10 fill-current "
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="48px"
										>
											<path d="M0 0h24v24H0V0z" fill="none" />
											<path d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71zM5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z" />
										</svg>
										<span className="ml-6 mr-2">DOWNLOAD GRID</span>
									</div>
								</button>
							</div>
							<div className="flex space-x-8">
								<div className="relative">
									<button
										onClick={() => {
											setShowStyles(!showStyles)
											setShowSettings(false)
										}}
										className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 focus:outline-none p-4 rounded-full pointer-events-auto"
									>
										<div className="flex flex-row justify-center items-center">
											<svg
												className=" h10 w-10 fill-current "
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="48px"
											>
												<path d="M0 0h24v24H0V0z" fill="none" />
												<path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z" />
											</svg>
											<span className="ml-6 mr-2">STYLES</span>
										</div>
									</button>
									{showStyles && <Styles />}
								</div>
								<div className="relative">
									<button
										onClick={() => {
											setShowSettings(!showSettings)
											setShowStyles(false)
										}}
										className="bg-indigo-400 focus:outline-none p-4 rounded-full pointer-events-auto"
									>
										<div className="flex flex-row justify-center items-center">
											<svg
												className=" h10 w-10 fill-current "
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="48px"
											>
												<rect fill="none" height="24" width="24" />
												<path d="M19.5,12c0-0.23-0.01-0.45-0.03-0.68l1.86-1.41c0.4-0.3,0.51-0.86,0.26-1.3l-1.87-3.23c-0.25-0.44-0.79-0.62-1.25-0.42 l-2.15,0.91c-0.37-0.26-0.76-0.49-1.17-0.68l-0.29-2.31C14.8,2.38,14.37,2,13.87,2h-3.73C9.63,2,9.2,2.38,9.14,2.88L8.85,5.19 c-0.41,0.19-0.8,0.42-1.17,0.68L5.53,4.96c-0.46-0.2-1-0.02-1.25,0.42L2.41,8.62c-0.25,0.44-0.14,0.99,0.26,1.3l1.86,1.41 C4.51,11.55,4.5,11.77,4.5,12s0.01,0.45,0.03,0.68l-1.86,1.41c-0.4,0.3-0.51,0.86-0.26,1.3l1.87,3.23c0.25,0.44,0.79,0.62,1.25,0.42 l2.15-0.91c0.37,0.26,0.76,0.49,1.17,0.68l0.29,2.31C9.2,21.62,9.63,22,10.13,22h3.73c0.5,0,0.93-0.38,0.99-0.88l0.29-2.31 c0.41-0.19,0.8-0.42,1.17-0.68l2.15,0.91c0.46,0.2,1,0.02,1.25-0.42l1.87-3.23c0.25-0.44,0.14-0.99-0.26-1.3l-1.86-1.41 C19.49,12.45,19.5,12.23,19.5,12z M12.04,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.97,15.5,12.04,15.5z" />
											</svg>
											<span className="ml-6 mr-2">SETTINGS</span>
										</div>
									</button>
									{showSettings && <Settings />}
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
			<div className="fixed bottom-5 left-5 text-gray-800">
				<button
					onClick={() => {
						setShowDashboard(!showDashboard)
					}}
					className={` focus:outline-none  pointer-events-auto`}
				>
					{showDashboard ? (
						<svg className=" h10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px">
							<path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
							<path d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16c-.39.39-.39 1.02 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64 2.64z" />
						</svg>
					) : (
						<svg className=" h10 w-10 fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px">
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
						</svg>
					)}
				</button>
			</div>
		</>
	)
}
