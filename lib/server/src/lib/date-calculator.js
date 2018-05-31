import moment from 'moment';

function calcDaysToDay(futureDay, date) {
    const now = moment(date);
    const future = moment(date).date(futureDay);

    if (future.isBefore(now)) {
      future.add(1, 'month');
    }

    return future.diff(now, 'days');
}

function calcDaysFromDay(pastDay, date) {
    const now = moment(date);
    const past = moment(date).date(pastDay);

    if (now.isBefore(past)) {
      past.subtract(1, 'month');
    }

    return now.diff(past, 'days');
}

function isDateInBetween(start, end, today) {
    return moment(today).isBetween(start, end, null, '[]');
}

function rewindDateToDay(currentDate, day) {
  const now = moment(currentDate);
  const past = moment(currentDate).date(day);

  if (now.isBefore(past)) {
    past.subtract(1, 'month');
  }


  return past;
}


export {
    calcDaysToDay,
    calcDaysFromDay,
    isDateInBetween,
    rewindDateToDay,
};
