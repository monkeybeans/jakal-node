import * as express from 'express';
import settings from '../settings';
import { calculatePeriodState } from '../lib/period-calculator';
import { checkIfVotingAllowed, getPublicUserData } from '../db/handlers/users';

const router = express.Router();

//const daysInMonthForDate = date => (new Date(date.getFullYear(), date.getMonth(), 0)).getDate();



router.get('/config', (req, res, next) => {
  const session = req.cookies.session;

  const periodData = calculatePeriodState({
    settings,
    today: new Date(),
  });

  const payload = Object.assign({}, periodData);

  getPublicUserData(session)
  .then(user => Object.assign(payload, { user }))
  .then(() => checkIfVotingAllowed(session))
  .then(voteEligible => Object.assign(payload, {userHasVoted: !voteEligible}))
  .then( payload => res.json(payload))
  .catch(next);
});


export {
  router as default,
  calculatePeriodState,
}
