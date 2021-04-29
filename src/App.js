import React from 'react';
import './assets/styles/main.scss';

import NavBar from './components/NavBar/NavBar';
import WeatherChart from './components/WeatherChart/WeatherChart';
import WeatherStatistic from './components/WeatherStatistic/WeatherStatistic';

function App() {
    return (
        <div className="weather-app-layout">
            <NavBar />
            hello1
            <WeatherStatistic />
            <WeatherChart />
        </div>
    );
}

export default App;
