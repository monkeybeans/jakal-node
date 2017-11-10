import * as express from 'express';
import settings from '../settings';
import { calculatePeriodState } from '../lib/period-calculator';
import { checkIfVotingAllowed } from '../db/handlers/users';

const router = express.Router();

//const daysInMonthForDate = date => (new Date(date.getFullYear(), date.getMonth(), 0)).getDate();



router.get('/config', (req, res, next) => {
  const session = req.cookies.session;

  const periodData = calculatePeriodState({
    settings,
    today: new Date(),
  });

  checkIfVotingAllowed(session)
  .then(voteEligible => {
    res.json(Object.assign({}, periodData, {userHasVoted: !voteEligible}));
  })
  .catch(next);
});


export {
  router as default,
  calculatePeriodState,
}
