import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import AccountStatus from './AccoutStatus';
import { defaultState } from '../../reducers';

import 'jsdom-global/register';

describe('<AppStatus />', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(defaultState());

  const wrapper = mount(
    <Provider store={store}>
      <AccountStatus classes={{}} />
    </Provider>
  );

  const setState = jest.fn();
  const useStateMock: any = (init: any) => [init, setState];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  it('should render account selector', () => {
    const accountSelect = wrapper.find('#account-select').at(1);
    expect(accountSelect.length).toBe(1);
    accountSelect.simulate('click');
  });
  it('should render view button', () => {
    const btnView = wrapper.find('#btn-view').at(1);
    expect(btnView.length).toBe(1);
    btnView.simulate('click');
  });
});
