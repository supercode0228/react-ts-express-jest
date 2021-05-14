export interface AlertDetail {
  name: string,
  currentState: string,
  currentStateSince: number,
  tsStart: number,
  tsStep: string,
  tsStepUnit: string,
  tsData: number[]
};

export interface Alert {
  offline: AlertDetail,
};

export interface AlertStatus {
  accountId: string,
  alerts: Alert,
};

export interface IChartData {
  time: number,
  value: number,
};

export interface IUSER {
  id: string,
  name: string,
};

// Types for reducers
export interface AccountStatusListState {
  status: string, // 'INIT', 'LOADING' | 'LOADED' | 'ERROR',
  payload: AlertStatus | null,
  errorMessage?: string
}

export interface AppState {
  accountStatusList: AccountStatusListState
}