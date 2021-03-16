import React from 'react'
import Icon from '../Icon/Icon'

function WeatherStatistic() {


    return (
        <div className="weather-statistic">
            <div className="weather-status-wrapper">
                <div className="weather-status__icon">
                    <Icon name="cloud" />
                </div>
                <div className="weather-status-inner">
                    <div className="weather-status"> Cloudy </div>
                    <div className="weather-params">
                        <span className="param"> <Icon name="thermo" /> 29.2 &#176;C</span>
                        <span className="param"> <Icon name="drop" /> 73%</span>
                    </div>
                </div>
            </div>
            <div className="weather-statistic__bottom-bar">
                <div className="bottom-bar-item">
                    <div className="bottom-bar-item__title">PSI</div>
                    <div className="bottom-bar-item__value" style={{ padding: "5px 12px", borderRadius: "6px", backgroundColor: "#1e9a1e" }}>23</div>
                    <div className="bottom-bar-item__desc">Good</div>
                </div>
                <div className="bottom-bar-item">
                    <div className="bottom-bar-item__title">RAIN</div>
                    <div className="bottom-bar-item__value">0</div>
                    <div className="bottom-bar-item__desc">mm</div>
                </div>
                <div className="bottom-bar-item">
                    <div className="bottom-bar-item__title">DENGUE</div>
                    <div className="round-button"></div>
                </div>
                <div className="bottom-bar-item">
                    <button className="add-btn">
                        <div className="btn-icon">
                            <Icon name="plus" />
                        </div>
                        <div className="btn-title">
                            ADD
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WeatherStatistic
