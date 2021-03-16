import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import NavBar from './components/NavBar/NavBar';


describe("Renders App component", () => {
  it('Should have one <Navbar/> component', () => {
    const component = shallow(<App />);
    expect(component.find(NavBar).length).toBe(1);
  });
});

