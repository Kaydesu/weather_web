import React from "react";
import { shallow } from 'enzyme';
import { findByAtrr } from "../../utils/helpers";
import WeatherChart from "./WeatherChart";
import renderer from "react-test-renderer";


describe("Weather chart", () => {
    it("Should be render correctly", () => {
        // let wrapper = renderer.create(<WeatherChart />).toJSON();
        // expect(wrapper).toMatchSnapshot();
    });
});