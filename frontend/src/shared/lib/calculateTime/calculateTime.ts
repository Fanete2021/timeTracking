import { Time } from 'shared/ui';

const secHour = 60 * 60;
const secMin = 60;

export enum operations {
  PLUS = 'PLUS',
  MINUS = 'MINUS'
}

//Функция для операций с типом Time
export const calculateTime = (a: Time, b: Time, operation = operations.PLUS): Time => {
  let allSeconds: number = 0;
  const result: Time = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  if (operation == operations.PLUS) {
    allSeconds = (a.hours * secHour + a.minutes * secMin + a.seconds) +
      (b.hours * secHour + b.minutes * secMin + b.seconds);
  } else if (operation == operations.MINUS) {
    allSeconds = (a.hours * secHour + a.minutes * secMin + a.seconds) -
      (b.hours * secHour + b.minutes * secMin + b.seconds);
  }

  if (allSeconds <= 0) {
    return result;
  }

  const hours = Math.floor(allSeconds / secHour);
  const minutes = Math.floor((allSeconds % secHour) / secMin);
  const seconds = allSeconds % secMin;

  result.hours = hours;
  result.minutes = minutes;
  result.seconds = seconds;

  return result;
};