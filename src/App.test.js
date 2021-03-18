import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import NavBar from './components/NavBar/NavBar';
import WeatherStatistic from './components/WeatherStatistic/WeatherStatistic';
import WeatherChart from './components/WeatherChart/WeatherChart';

it("Should render correctly", () => {
  const component = shallow(<App />);
  expect(component.find(NavBar).length).toBe(1);
  expect(component.find(WeatherStatistic).length).toBe(1);
  expect(component.find(WeatherChart).length).toBe(1);
});

