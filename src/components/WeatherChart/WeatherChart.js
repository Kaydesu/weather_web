import React from 'react';
import { Line } from 'react-chartjs-2';

function WeatherChart() {

    return (
        <div className="chart-container">
            <Line
                data={{
                    labels: ["1:00 AM", "2:00 AM", "3:00 AM"],
                    datasets: [
                        {
                            label: "sun rise",
                            data: [4, 2, 2]
                        }
                    ]
                }}
                width={3000}
                height={280}
                options={{
                    maintainAspectRatio: false,
                    responsive: false,
                    scales: {
                        yAxes: [
                            {
                                type: 'linear',
                                display: false,
                                position: 'left',
                                id: 'time',
                            },
                            {
                                type: 'linear',
                                display: false,
                                position: 'right',
                                id: 'y-axis-2',
                            },
                            {
                                type: 'linear',
                                display: false,
                                position: 'left',
                                id: 'y-axis-3',
                            }
                        ]
                    }
                }}
            />
        </div>
    )
}

export default WeatherChart
