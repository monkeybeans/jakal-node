const dayInMonth = (month: number, year: number): number => new Date(year, month, 0).getDate();

function calcDaysToDay(futureDay: number, date: Date): number {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();

  const daysOfThisMonth: number = dayInMonth(year, month);

  if (day <= futureDay) {
    return futureDay - day;
  }

  return daysOfThisMonth - day + futureDay;
}

function calcDaysFromDay(pastDay: number, date: Date): number {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();

  const daysOfPreviousMonth: number = dayInMonth(year, month - 1);

  if (day >= pastDay) {
    return day - pastDay;
  }

  return day + daysOfPreviousMonth - pastDay;
}

function isDateInBetween(start: Date, end: Date, today?: Date): boolean {
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

export {
  calcDaysToDay,
  calcDaysFromDay,
  isDateInBetween,
};
