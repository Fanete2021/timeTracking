import { Time } from 'shared/ui';

const secHour = 60 * 60;
const secMin = 60;

export enum operations {
  SUM = 'SUM',
  MINUS = 'MINUS'
}

export const calculateTime = (a: Time, b: Time, operation = operations.SUM): Time => {
  let allSeconds: number = 0;
  const result: Time = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  if (operation == operations.SUM) {
    allSeconds = (a.hours * secHour + a.minutes * secMin + a.seconds) +
      (b.hours * secHour + b.minutes * secMin + b.seconds);
  } else if (operation == operations.MINUS) {
    allSeconds = (a.hours * secHour + a.minutes * secMin + a.seconds) -
      (b.hours * secHour + b.minutes * secMin + b.seconds);
  }

  if (allSeconds < 0) {
    allSeconds = 0;
  }

  const hours = Math.floor(allSeconds / secHour);
  const minutes = Math.floor((allSeconds % secHour) / secMin);
  const seconds = allSeconds % secMin;

  result.hours = hours;
  result.minutes = minutes;
  result.seconds = seconds;

  return result;
};