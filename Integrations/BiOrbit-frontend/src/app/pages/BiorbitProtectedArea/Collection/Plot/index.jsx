import React from 'react'
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import './Plot.scss'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

export function Plot(props) {
	const { collection } = props

	if (collection) {
		collection.coverForest = collection.coverForest.map(cover =>
			parseInt(cover)
		)

		const coverForest = []
		const date = []

		console.log('information: ', collection)

		for (const key in collection.coverForest) {
			if (collection.coverForest.hasOwnProperty(key)) {
				coverForest.push(collection.coverForest[key])
				date.push(collection.date[key])
			}
		}

		const options = {
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				},
				title: {
					display: true,
					text: 'Lastest activity'
				}
			},
			scales: {
				y: [
					{
						scaleLabel: {
							display: true,
							labelString: 'Cover Forest extension (hectareas)'
						}
					}
				]
			}
		}
		const data = {
			labels: date,
			datasets: [
				{
					label: 'Cover Forest',
					data: coverForest,
					borderColor: 'rgba(243, 114, 181, 0.8)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)'
				}
			]
		}
		return <Line options={options} data={data} />
	}
}
