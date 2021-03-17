import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Bubble, Line, Scatter } from 'react-chartjs-2';
import { convertToDayNight, generateTideData, generateTimeData, getFullDayTime, getPlottedDayTime, scale } from '../../utils/helpers';
import { useWindowResize } from './useWindowResize';
import sunImgSrc from '../../assets/images/sun.png';

function WeatherChart() {

    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const sunRef = useRef(null);
    const chartWidth = useWindowResize()
    const [chartHeight, setChartHeight] = useState(300);
    const [sunPosition, setSunPosition] = useState({ x: 6, y: getPlottedDayTime(6), r: 5 });


    const days = 3;

    const hourData = generateTimeData(days);
    const plotHourData = useMemo(() => hourData.map(h => getPlottedDayTime(h)), [days]);
    const tideData = useMemo(() => generateTideData(days), [days]);
    const dayNightData = hourData.map(h => convertToDayNight(h));

    const sunImage = new Image();
    sunImage.src = sunImgSrc;
    sunImage.width = 25;
    sunImage.height = 25;

    const canvasWidth = chartWidth * 2 * days;

    useEffect(() => {
        const canvasWidth = chartWidth * 2 * days;
        chartRef.current.chartInstance.width = canvasWidth;
        chartRef.current.chartInstance.height = chartContainerRef.current.offsetHeight;

        setChartHeight(chartContainerRef.current.offsetHeight - 20);
    }, [chartContainerRef, chartWidth]);

    const handleScroll = (e) => {
        let maxScroll = e.target.scrollWidth - e.target.clientWidth;
        let scrollLeft = e.target.scrollLeft;
        let totalHours = days * 24;

        let x = Math.floor(scale(scrollLeft, [0, maxScroll], [6, totalHours - 6]));
        let y = getPlottedDayTime(x);

        setSunPosition({
            ...sunPosition,
            x,
            y
        })
    }


    return (
        <div className="chart-container" ref={chartContainerRef} onScroll={handleScroll} >
            {/* <Line
                ref={chartRef}
                width={canvasWidth}
                height={chartHeight}
                data={{
                    labels: hourData,
                    datasets: [
                        {
                            label: "sun rise",
                            data: plotHourData,
                            borderColor: "#f5793b",
                            borderWidth: 2,
                            fill: false,
                            xAxisID: "timeX",
                            yAxisID: "time",
                        },
                        {
                            type: "line",
                            label: "day night",
                            data: dayNightData,
                            borderWidth: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            borderColor: "rgba(0, 0, 0, 0)",
                            fill: true,
                            yAxisID: "daynight",
                            steppedLine: true
                        },
                        {
                            type: "line",
                            label: "Tide",
                            data: tideData,
                            borderWidth: 0,
                            borderColor: "rgba(0, 0, 0, 0)",
                            backgroundColor: "#c1e5f7",
                            fill: true,
                            yAxisID: "tide"
                        },
                        {
                            type: "bubble",
                            label: "Sun Image",
                            data: [{ ...sunPosition }],
                            pointStyle: sunImage
                        }
                    ]
                }}
                options={{
                    maintainAspectRatio: false,
                    responsive: false,
                    elements: {
                        point: {
                            radius: 0
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                id: "timeX",
                                gridLines: {
                                    display: false
                                }
                            },
                        ],
                        yAxes: [
                            {
                                type: 'linear',
                                display: false,
                                position: 'left',
                                id: 'time',
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 1.05,
                                    beginAtZero: true,
                                }
                            },
                            {
                                type: 'linear',
                                display: false,
                                position: 'left',
                                id: 'daynight',
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 0.5,
                                    beginAtZero: true,
                                }
                            },
                            {
                                type: 'linear',
                                display: false,
                                position: 'right',
                                id: 'tide',
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 10,
                                    beginAtZero: true,
                                }
                            },

                        ]
                    },
                    layout: {
                        padding: {
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0
                        }
                    },
                    legend: {
                        display: false,
                    },
                    animation: false
                }}
            /> */}
            <Scatter
                ref={chartRef}
                width={canvasWidth}
                height={chartHeight}
                data={{
                    datasets: [
                        // Day time in days
                        {
                            label: "Daytime",
                            xAxisID: "tideTime-x",
                            yAxisID: "day-y",
                            showLine: true,
                            borderColor: "#f5793b",
                            borderWidth: 2,
                            fill: false,
                            data: hourData.map((h) => {
                                return {
                                    x: h,
                                    y: getPlottedDayTime(h)
                                }
                            })

                        },
                        // Day or night, step function:
                        {
                            type: "scatter",
                            label: "Day/Night",
                            yAxisID: "daynight-y",
                            showLine: true,
                            borderColor: "rgba(0, 0, 0, 0)",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            fill: true,
                            steppedLine: true,
                            data: hourData.map((h) => ({ x: h, y: convertToDayNight(h) }))
                        },
                        // Tide data in days:    
                        {
                            type: "scatter",
                            label: "Tide",
                            yAxisID: "tide-y",
                            showLine: true,
                            borderColor: "rgba(0, 0, 0, 0)",
                            backgroundColor: "#c1e5f7",
                            fill: true,
                            data: hourData.map((h, i) => ({ x: h, y: tideData[i] }))
                        }

                    ]
                }}
                options={{
                    maintainAspectRatio: false,
                    responsive: false,
                    scales: {
                        xAxes: [
                            {
                                type: "linear",
                                id: "tideTime-x",
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    min: 0,
                                    max: hourData[hourData.length - 1]
                                }
                            }
                        ],
                        yAxes: [
                            {
                                type: "linear",
                                id: "day-y",
                                display: false,
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    beginAtZero: true,
                                    suggestedMax: 1.05,
                                    suggestedMin: 0
                                }
                            },
                            {
                                type: "linear",
                                id: "daynight-y",
                                display: false,
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    beginAtZero: true,
                                    suggestedMin: 0,
                                    suggestedMax: 1,
                                }
                            },
                            {
                                type: "linear",
                                id: "tide-y",
                                display: false,
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    beginAtZero: true,
                                    suggestedMin: 0,
                                    suggestedMax: 10,
                                }
                            }
                        ]
                    },
                    elements: {
                        point: {
                            radius: 0,
                        }
                    },
                    legend: {
                        display: false
                    }
                }}
            />
        </div>
    )
}

export default WeatherChart
