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
    const past = moment(date).date(pastDay, 'days');

    if (now.isBefore(past)) {
      past.subtract(1, 'month');
    }

    return now.diff(past, 'days');
}

function isDateInBetween(start, end, today) {
    return moment(today).isBetween(start, end, null, '[]');
}

function rewindDateToDay(currentDate, day) {

  return moment(currentDate).subtract(day, 'days');
}


export {
    calcDaysToDay,
    calcDaysFromDay,
    isDateInBetween,
    rewindDateToDay,
};
