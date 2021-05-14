export interface IAlertDetail {
  name: string,
  currentState: string,
  currentStateSince: number,
  tsStart: number,
  tsStep: string,
  tsStepUnit: string,
  tsData: number[]
};

export interface IAlert {
  offline: IAlertDetail,
};

export interface IAlertStatus {
  accountId: string,
  alerts: IAlert,
};

export interface IUSER {
  id: string,
  name: string,
};