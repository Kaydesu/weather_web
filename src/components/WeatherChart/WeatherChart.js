import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Chart, Scatter } from 'react-chartjs-2';
import { convertToDayNight, countDayByHour, formatTime, generateTideData, generateTimeData, getPlottedDayTime, scale } from '../../utils/helpers';
import { useWindowResize } from './useWindowResize';
import sunImgSrc from '../../assets/images/sun.png';
import moonImgSrc from '../../assets/images/moon.png';

const sunImage = new Image();
sunImage.src = sunImgSrc;
sunImage.width = 25;
sunImage.height = 25;

const days = 3;
const hourData = generateTimeData(days);
const tideData = generateTideData(days);

function WeatherChart() {

    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const chartWidth = useWindowResize();
    const [chartHeight, setChartHeight] = useState(300);
    const [sunPosition, setSunPosition] = useState({ x: 6, y: getPlottedDayTime(6), r: 5 });
    const [moonVisible, setMoonVisible] = useState(false);
    const [dayNumb, setDayNumb] = useState(1);
    const [timeText, setTimeText] = useState("6:00 am");
    const [tideText, setTideText] = useState(`${tideData[1].waterLevel.toFixed(2)} m`);

    const canvasWidth = chartWidth * 2 * days;

    useEffect(() => {
        const canvasWidth = chartWidth * 2 * days;
        chartRef.current.chartInstance.width = canvasWidth;
        chartRef.current.chartInstance.height = chartContainerRef.current.offsetHeight - 20;
        setChartHeight(chartContainerRef.current.offsetHeight - 20);
    }, [chartContainerRef, chartWidth]);

    useEffect(() => {
        Chart.pluginService.register({
            afterDraw: (chart, easing) => {
                let ctx = chart.ctx;
                const tideDataPoint = chart.getDatasetMeta(2).data;

                tideDataPoint.map((chartElm, i) => {
                    let pointData = chartElm._model;
                    let offSet = 45;

                    ctx.font = "14px Comic Sans MS";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#333";
                    ctx.fillText(`${tideData[i].waterLevel.toFixed(2)} m`, pointData.x, pointData.y - offSet + 18);
                    ctx.fillText(formatTime(tideData[i].time), pointData.x, pointData.y - offSet + 35);

                    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                    ctx.fillRect(pointData.x - 28, pointData.y - offSet, 60, 44);

                });
            }
        })
    }, []);

    const handleScroll = (e) => {
        let maxScroll = e.target.scrollWidth - e.target.clientWidth;
        let scrollLeft = e.target.scrollLeft;
        let totalHours = days * 24;

        let x = scale(scrollLeft, [0, maxScroll], [6, totalHours - 6]);
        let y = getPlottedDayTime(x);
        setSunPosition({
            ...sunPosition,
            x,
            y
        });

        if (convertToDayNight(x) == 1) {
            setMoonVisible(true);
        } else if (convertToDayNight(x) == 0) {
            setMoonVisible(false);
        }
        setDayNumb(countDayByHour(x));
        setTimeText(formatTime(x));

        let idx = tideData.findIndex(data => data.time == Math.floor(x));

        if (idx != -1) {
            setTideText(tideData[idx].waterLevel.toFixed(2) + "m");
        }
    }


    return (
        <div className="chart-container" ref={chartContainerRef} onScroll={handleScroll} data-test="chart">
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
                            xAxisID: "tideTime-x",
                            showLine: true,
                            borderColor: "rgba(0, 0, 0, 0)",
                            backgroundColor: "#c1e5f7",
                            fill: true,
                            // data: hourData.map((h, i) => ({ x: h, y: tideData[i] }))
                            data: tideData.map(data => ({ x: data.time, y: data.waterLevel })),
                        },
                        // Sun icon:
                        {
                            type: "bubble",
                            label: "Sun",
                            yAxisID: "sun-y",
                            data: [{ ...sunPosition }],
                            pointStyle: sunImage,
                        },
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
                                display: false,
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
                                    suggestedMax: 3,
                                }
                            },
                            {
                                type: "linear",
                                id: "sun-y",
                                display: false,
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    beginAtZero: true,
                                    suggestedMin: 0,
                                    suggestedMax: 1.05,
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
                    },
                    animation: {
                        duration: 0.5
                    }
                }}
            />
            <img className="moon-img" src={moonImgSrc} style={{ display: moonVisible ? 'block' : 'none' }} />
            <div className="day-text"> Day {dayNumb}</div>
            <div className="time-tag">{timeText} {tideText}</div>
        </div>
    )
}

export default WeatherChart
