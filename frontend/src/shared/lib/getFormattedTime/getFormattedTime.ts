import { Time } from 'shared/ui';

export const getFormattedTime = (time: Time) => {
  return `${time.hours}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
};
