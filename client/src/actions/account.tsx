import { Action, Dispatch } from 'redux';
import fetch from 'node-fetch';
import { AlertStatus } from '../types';

export const FETCH_ACCOUNT_STATUS = 'FETCH_ACCOUNT_STATUS';
export const FETCH_ACCOUNT_STATUS_SUCCESS = 'FETCH_ACCOUNT_STATUS_SUCCESS';
export const FETCH_ACCOUNT_STATUS_ERROR = 'FETCH_ACCOUNT_STATUS_ERROR';

export function isAction<A extends Action>(action: Action, type: string): action is A {
  return action.type === type;
}

export interface IActionAccountStatusFetch extends Action {
  type: 'FETCH_ACCOUNT_STATUS'
}

export interface IActionAccountStatusFetchSuccess extends Action {
  type: 'FETCH_ACCOUNT_STATUS_SUCCESS',
  payload: AlertStatus,
  status: string
}

export interface IActionAccountStatusFetchError extends Action {
  type: 'FETCH_ACCOUNT_STATUS_ERROR',
  errorMessage: string,
  status: string
}

export type AccountStatusActions = IActionAccountStatusFetch | IActionAccountStatusFetchSuccess | IActionAccountStatusFetchError;

function fetchAccountStatusPending(): IActionAccountStatusFetch {
  return {
    type: FETCH_ACCOUNT_STATUS,
  };
}

function fetchAccountStatusSuccess(data: AlertStatus, status: string): IActionAccountStatusFetchSuccess {
  return {
    type: FETCH_ACCOUNT_STATUS_SUCCESS,
    payload: data,
    status
  };
}

function fetchAccountStatusError(eMsg: string, status: string): IActionAccountStatusFetchError {
  return {
    type: FETCH_ACCOUNT_STATUS_ERROR,
    errorMessage: eMsg,
    status
  };
}

export const fetchAccountStatusRequest = (accountId: string, startTimestamp: number) => (dispatch: Dispatch) => {
  dispatch(fetchAccountStatusPending());

  fetch(`${process.env.REACT_APP_API_URL}/alerting/smartblox/account/states/offline/${accountId}/${startTimestamp}`)
    .then((res) => res.json())
    .then((result) => {
      const { status, errorMessage, payload } = result;
      if (status === "200") {
        dispatch(fetchAccountStatusSuccess(payload, status));
      } else {
        dispatch(fetchAccountStatusError(errorMessage, status));
      }
    });
};
