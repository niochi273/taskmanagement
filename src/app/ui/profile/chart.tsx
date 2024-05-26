// components/Chart.tsx
import { FC, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { roboto } from '../fonts';

const MyChart: FC = () => {
	const chartRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const ctx = chartRef.current?.getContext('2d');
		if (!ctx) return;

		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['December', 'January', 'February', 'March', 'April', 'May'],
				datasets: [
					{
						label: 'Tasks Completed',
						data: [12, 19, 3, 5, 2, 3], // Replace with your actual completed tasks data
						backgroundColor: 'rgba(75, 192, 192, 0.2)', // Green
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
					},
					{
						label: 'Tasks Assigned',
						data: [20, 25, 18, 30, 22, 25], // Replace with your actual assigned tasks data
						backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							font: {
								family: 'Arial',
								size: 16
							}
						}
					},
					x: {
						ticks: {
							font: {
								size: 16, // Font size for x-axis labels
							},
						},
					},
				},
				plugins: {
					legend: {
						labels: {
							font: {
								size: 16, // Font size for legend labels
							},
						},
					},
					tooltip: {
						bodyFont: {
							size: 14, // Font size for tooltip text
						},
						titleFont: {
							size: 16, // Font size for tooltip title
						},
					},
				},
			},
		});

		// Clean up the chart on component unmount
		return () => {
			Chart.getChart(ctx)?.destroy();
		};
	}, []);

	return (
		<canvas ref={chartRef} id="myChart" className='max-h-full w-full' />
	);
};

export default MyChart;
