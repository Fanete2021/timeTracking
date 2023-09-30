import { Time } from 'shared/ui';

const msHour = 60 * 60 * 1000;
const msMin = 60 * 1000;
const msSec = 1000;

export const getTimeElapsed = (date: Date): Time => {
  const differenceTime = new Date().getTime() - date.getTime();

  const hours = Math.floor(differenceTime / msHour);
  const minutes = Math.floor((differenceTime % msHour) / msMin);
  const seconds = Math.floor((differenceTime % msMin) / msSec);

  return {
    hours,
    minutes,
    seconds
  };
};