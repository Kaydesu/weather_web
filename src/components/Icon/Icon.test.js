import React from 'react';
import checkPropTypes from 'check-prop-types';
import { shallow } from 'enzyme';
import Icon from './Icon';

describe("Render Icon with valid name", () => {
    it("Should always render a span container when have valid name", () => {
        expect(shallow(<Icon name="burgerMenu" />).type()).toMatch("span");
        expect(shallow(<Icon name="cloud" />).type()).toMatch("span");
        expect(shallow(<Icon name="bell" />).type()).toMatch("span");
        expect(shallow(<Icon name="plus" />).type()).toMatch("span");
        expect(shallow(<Icon name="thermo" />).type()).toMatch("span");
        expect(shallow(<Icon name="drop" />).type()).toMatch("span");
    })
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