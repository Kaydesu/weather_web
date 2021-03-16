import React from "react";
import renderer from "react-test-renderer";
import WeatherStatistic from "./WeatherStatistic";

it("should render App correctly", () => {
    const tree = renderer.create(<WeatherStatistic />).toJSON();
    expect(tree).toMatchSnapshot();
});