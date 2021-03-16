import React from 'react';
import './assets/styles/main.scss';

import NavBar from './components/NavBar/NavBar';
import WeatherStatistic from './components/WeatherStatistic/WeatherStatistic';

function App() {
    return (
        <div className="weather-app-layout">
            <NavBar />
            <WeatherStatistic/>
        </div>
    );
}

export default App;
