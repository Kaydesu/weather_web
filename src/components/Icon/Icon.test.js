import React from 'react';
import checkPropTypes from 'check-prop-types';
import { shallow } from 'enzyme';
import Icon from './Icon';

describe("Have no name props", () => {
    it("Should not render without props", () => {
        const component = shallow(<Icon />)
        expect(component.type()).toEqual(null);
    });

    it("Should not render without name", () => {
        const component = shallow(<Icon onClick={() => console.log("test")} />)
        expect(component.type()).toEqual(null);
    });

    it("Should not render with false name", () => {
        const component = shallow(<Icon name="falsy" />);
        expect(component.type()).toEqual(null);
    })
});

describe("Have name in a valid list", () => {
    it("Should render a div container", () => {
        const component = shallow(<Icon name="bell" />);
        expect(component.type()).toMatch("div");
    });
    it("Should render a div container", () => {
        const component = shallow(<Icon name="burgerMenu" />);
        expect(component.type()).toMatch("div");
    });
    it("Should render a div container", () => {
        const component = shallow(<Icon name="cloud" />);
        expect(component.type()).toMatch("div");
    });
});

describe("Have invalid prop types", () => {
    it("Should not render", () => {
        const props = {
            name: 123,
            onClick: () => console.log(test),
            style: { width: 30, heigh: 60 }
        }
        const propsErr = checkPropTypes(Icon.propTypes, props, 'props', Icon.name);
        expect(propsErr).toBeTruthy();
    });
    it("Should not render", () => {
        const props = {
            name: "cloud",
            onClick: "function",
            style: { width: 30, heigh: 60 }
        }
        const propsErr = checkPropTypes(Icon.propTypes, props, 'props', Icon.name);
        expect(propsErr).toBeTruthy();
    });
    it("Should not render", () => {
        const props = {
            name: "cloud",
            onClick: "function",
            style: "margin"
        }
        const propsErr = checkPropTypes(Icon.propTypes, props, 'props', Icon.name);
        expect(propsErr).toBeTruthy();
    });
});