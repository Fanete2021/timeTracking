import { Time } from 'shared/ui';

export const splitStringToTime = (time: string): Time => {
  const timeParts = time.split(':').map(Number);

  if (timeParts.length !== 3) {
    return null;
  }

  const [ hours, minutes, seconds ] = timeParts;

  return {
    hours,
    minutes,
    seconds
  };
};