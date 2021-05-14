import { Response, Request } from 'express';
import { IAlertStatus, IUSER } from '../../types';
import { accountData } from '../../utils/data';

const getAccountStatusList = async (req: Request, res: Response): Promise<void> => {
  try {
    const accountId = req.params.accountId;
    const startTimestamp = Math.floor(parseInt(req.params.startTimestamp)/1000);

    const currentTimeStamp = Math.floor(new Date().getTime()/1000);
    const stepValue = Math.floor((currentTimeStamp - startTimestamp) / 60);
    const tsStep = stepValue < 60 ? "60" : stepValue.toString();
    const interval = stepValue < 60 ? Math.floor((currentTimeStamp - startTimestamp) / 60) : 60;

    const account: IUSER = accountData.find(item => item.id === accountId);

    if (!account) {
      res.status(404).json({
        status: "404",
        errorMessage: "Account not found/invalid",
        traceId: "5962EA42-9232-4545-8E90-196B755989AD"
      });
    } else if (startTimestamp + 24 * 3600 < currentTimeStamp) {
      res.status(405).json({
        status: "405",
        errorMessage: "Too large a time window. You need to request a more recent start time.",
        traceId: "5962EA42-9232-4545-8E90-196B755989AD"
      });
    } else if (startTimestamp >= currentTimeStamp) {
      res.status(405).json({
        status: "405",
        errorMessage: "The start time should be less than current time.",
        traceId: "5962EA42-9232-4545-8E90-196B755989AD"
      });
    } else {
      const payload: IAlertStatus = {
        accountId,
        alerts: {
          offline: {
            name: "Account offline",
            currentState: "CLEAR",
            currentStateSince: currentTimeStamp,
            tsStart: startTimestamp,
            tsStep,
            tsStepUnit: "second",
            tsData: Array.from({length: interval}, () => Math.floor(Math.random() * 2))
          }
        }
      };
      res.status(200).json({
        payload,
        status: "200",
        errorMessage: "",
        traceId: "5962EA42-9232-4545-8E90-196B755989AD"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      errorMessage: "The server error",
      traceId: "5962EA42-9232-4545-8E90-196B755989AD"
    });
    throw error
  }
}

export {
  getAccountStatusList
};