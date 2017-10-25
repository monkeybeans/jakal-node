import * as express from 'express';
import settings from '../settings';
import { calculatePeriodState } from '../lib/period-calculator';

const router = express.Router();

//const daysInMonthForDate = date => (new Date(date.getFullYear(), date.getMonth(), 0)).getDate();



router.get('/config', (req, res) => {
  res.json(calculatePeriodState({
    settings,
    today: new Date(),
  }));
});


export {
  router as default,
  calculatePeriodState,
}
