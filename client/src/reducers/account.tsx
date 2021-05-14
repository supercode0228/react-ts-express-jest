import {
  AccountStatusActions
} from '../actions/account';

import { AccountStatusListState } from '../types';

export function defaultAccountStatusListState() {
  return {
    status: 'INIT',
    payload: null,
    errorMessage: ''
  };
}

export function accountStatusListReducer(state: AccountStatusListState, action: AccountStatusActions): AccountStatusListState {
  if (action.type === 'FETCH_ACCOUNT_STATUS') {
    return {
      ...state,
      status: 'LOADING',
      payload: null,
    };
  }
  if (action.type === 'FETCH_ACCOUNT_STATUS_SUCCESS') {
    return {
      ...state,
      status: 'LOADED',
      payload: action.payload,
    };
  }
  if (action.type === 'FETCH_ACCOUNT_STATUS_ERROR') {
    return {
      ...state,
      status: 'ERROR',
      payload: null,
      errorMessage: action.errorMessage
    };
  }
  return state;
}