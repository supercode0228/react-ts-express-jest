import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Theme,
  withStyles,
  createStyles,
  WithStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import moment from 'moment';

import SensorChart from '../../components/SensorChart';
import {fetchAccountStatusRequest} from '../../actions/account';
import {
  IChartData,
  AppState
} from '../../types';

import {accountData} from '../../utils/data';

const styles = (theme: Theme) => createStyles({
  container: {
    maxWidth: "780px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between"
  },
  headerContent: {
    display: "flex",
    alignItems: "center"
  },
  startTime: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(1),
    width: "auto",
  },
});

interface PlotProps extends WithStyles<typeof styles>{}

const AccountStatus: React.FunctionComponent<PlotProps> = props => {

  const {classes} = props;

  const [data, setData] = useState<IChartData[]>([]);
  const [errMsg, setErrMsg] = useState<string>('');
  const [accountId, setAccountId] = useState(accountData[0].id);
  const [startTime, setStartTime] = useState((new Date().getTime()) - 3600 * 1000);

  const dispatch = useDispatch();
  const accountStatusList = useSelector((state: AppState) => state.accountStatusList);

  const handleAccountChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setAccountId(e.target.value as string);
  };

  const handleStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(new Date(e.target.value).getTime());
  };

  const onSubmit = () => {
    dispatch(fetchAccountStatusRequest(accountId, startTime));
  };

  useEffect(() => {
    dispatch(fetchAccountStatusRequest(accountId, startTime));
  }, []);

  useEffect(() => {
    const {status, errorMessage, payload} = accountStatusList;
    if (status === 'LOADED') {
      if (payload) {
        const {tsStart, tsStep, tsStepUnit, tsData} = payload.alerts.offline;
        const chartData = tsData.map((item, index) => {
          let time = tsStart;
          if (tsStepUnit === "second") {
            time += parseFloat(tsStep) * index;
          }
          return {
            time,
            value: item
          };
        });
        setData(chartData);
        setErrMsg('');
      }
    } else if (status === 'ERROR') {
      setData([]);
      setErrMsg(errorMessage || '');
    }
  }, [accountStatusList]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.headerContent}>
          <div>
            <InputLabel id="account-label">Account</InputLabel>
            <Select
              labelId="account-label"
              id="account-select"
              value={accountId}
              onChange={handleAccountChange}
            >
              {accountData.map(item => (
                <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </div>
          <TextField
            id="start-time"
            label="Start time"
            type="datetime-local"
            defaultValue={moment(startTime).format('YYYY-MM-DDTHH:mm')}
            className={classes.startTime}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleStartTime}
          />
        </div>
        <div>
          <Button
            id="btn-view"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            View
          </Button>
        </div>
      </div>
      {errMsg ? (
        <Alert id="err-msg" severity="error">{errMsg}</Alert>
      ): (
        <SensorChart
          data={data}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(AccountStatus);