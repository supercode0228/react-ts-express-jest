import { mount } from 'enzyme';
import SensorChart from './SensorChart';

import 'jsdom-global/register';

describe('<SensorChart />', () => {
  const fakeData = [
    {
      time: 1603787654,
      value: 0
    },
    {
      time: 1603787714,
      value: 1
    }
  ];
  const wrapper = mount(<SensorChart classes={{}} data={fakeData} />);
  test('It should mount', () => {
    expect(wrapper.length).toBe(1);
  });
});