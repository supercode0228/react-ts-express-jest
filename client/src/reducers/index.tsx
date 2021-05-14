import {
  accountStatusListReducer,
  defaultAccountStatusListState
} from './account';

import {
  AccountStatusListState
} from '../types';

import { Action } from 'redux';

export interface AppState {
  accountStatusList: AccountStatusListState
}

export function defaultState() {
  return {
    accountStatusList: defaultAccountStatusListState()
  };
}

export function mainReducer(state: AppState = defaultState(), action: Action) {
  return {
    accountStatusList: accountStatusListReducer(state.accountStatusList, action)
  };
}