import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Timer.module.scss';
import { FC, useEffect, useRef, useState } from 'react';
import { calculateTime } from 'shared/lib/calculateTime/calculateTime';
import { getFormattedTime } from 'shared/lib/getFormattedTime/getFormattedTime';

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerProps {
  className?: string;
  time?: Time;
  isWork?: boolean;
}

export const Timer: FC<TimerProps> = (props: TimerProps) => {
  const {
    className,
    time,
    isWork = true
  } = props;

  const [ currentTime, setCurrentTime ] = useState<Time>(time || { hours: 0, minutes: 0, seconds: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setCurrentTime(time || { hours: 0, minutes: 0, seconds: 0 });
  }, [ time ]);

  useEffect(() => {
    if (isWork) {
      const second: Time = { hours: 0, minutes: 0, seconds: 1 };

      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => calculateTime(prev, second));
      }, 1000);

      return () => {
        clearInterval(intervalRef?.current);
      };
    } else {
      clearInterval(intervalRef?.current);
    }
  }, [ setCurrentTime, isWork ]);

  return (
    <div className={classNames(styles.Timer, {}, [ className ])}>
      {getFormattedTime(currentTime)}
    </div>
  );
};
