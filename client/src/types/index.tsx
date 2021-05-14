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