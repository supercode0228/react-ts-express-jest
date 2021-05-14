import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  const component = shallow(<App />);

  test('It should mount', () => {
    expect(component.length).toBe(1)
  });
});