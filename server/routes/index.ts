import { Router } from 'express';
import { getAccountStatusList } from '../controllers/account';
 
const router: Router = Router();

router.get('/alerting/smartblox/account/states/offline/:accountId/:startTimestamp', getAccountStatusList);

export default router;