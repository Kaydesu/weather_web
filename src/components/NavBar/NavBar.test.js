import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';
import { findByAtrr } from '../../utils/helpers';

describe("NavBar component", () => {
    let component;
    beforeEach(() => {
        component = shallow(<NavBar />);
    });

    it("Should be render with a burger menu", () => {
        let burgerMenu = findByAtrr(component, "burgerMenu");
        expect(burgerMenu.length).toBe(1);
    });

    it("Should be render with location", () => {
        let burgerMenu = findByAtrr(component, "burgerMenu");
        expect(burgerMenu.length).toBe(1);
    });

    it("Should be render with notification", () => {
        let burgerMenu = findByAtrr(component, "burgerMenu");
        expect(burgerMenu.length).toBe(1);
    });
})