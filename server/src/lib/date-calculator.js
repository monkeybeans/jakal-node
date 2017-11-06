const dayInMonth = (month, year) => new Date(year, month, 0).getDate();

function calcDaysToDay(futureDay, date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const daysOfThisMonth = dayInMonth(year, month);

    if (day <= futureDay) {
        return futureDay - day;
    }

    return daysOfThisMonth - day + futureDay;
}

function calcDaysFromDay(pastDay, date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const daysOfPreviousMonth = dayInMonth(year, month - 1);

    if (day >= pastDay) {
        return day - pastDay;
    }

    return day + daysOfPreviousMonth - pastDay;
}

function isDateInBetween(start, end, today) {
    if (!today) {
        today = new Date();
    }

    const tStart = start.getTime();
    const tEnd = end.getTime();
    const tToday = today.getTime();

    if (tEnd >= tToday && tToday >= tStart) {
        return true;
    }

    return false;
}

function rewindDateToDay(currentDate, day) {
  const date = new Date(currentDate);

  date.setHours(0, 0, 0, 0);

  for(;;) {
    if (day === date.getDate()) {
      return date;
    }

    date.setDate(date.getDate() - 1);
  }
}


export {
    calcDaysToDay,
    calcDaysFromDay,
    isDateInBetween,
    rewindDateToDay,
};
