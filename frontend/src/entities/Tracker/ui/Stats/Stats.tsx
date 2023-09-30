import { memo, useEffect, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Stats.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getLastWeekTrackers } from 'entities/Tracker';
import { useSelector } from 'react-redux';
import { getTrackerState } from 'entities/Tracker/model/selectors/getTrackerState';
import { ITracker } from '../../model/types/tracker';
import { Text, Time } from 'shared/ui';
import { getTimeElapsed } from 'shared/lib/getTimeElapsed/getTimeElapsed';
import { splitStringToTime } from 'shared/lib/splitStringToTime/splitStringToTime';
import { calculateTime, operations } from 'shared/lib/calculateTime/calculateTime';
import { getFormattedTime } from 'shared/lib/getFormattedTime/getFormattedTime';
import { getDaysOfWeek } from 'shared/lib/getDaysOfWeek/getDaysOfWeek';
import { getStartAndEndDay } from 'shared/lib/getStartAndEndDay/getStartAndEndDay';

const countDays = 7;
let allWorkedTime: Time = null;
let allPausedTime: Time = null;

const getTrackersByRange = (trackers: ITracker[], firstDate: Date, secondDate: Date): ITracker[] => {
  const firstTime = firstDate.getTime();
  const secondTime = secondDate.getTime();

  return trackers.filter((tracker) => {
    const startTime = new Date(tracker.startTime).getTime();

    return startTime >= firstTime && startTime <= secondTime;
  });
};

const calculateWorkTime = (tracker: ITracker): Time => {
  const timeElapsedStartTime = getTimeElapsed(new Date(tracker.startTime));
  const timeElapsedEndTime = getTimeElapsed(new Date(tracker.endTime));
  const pausedTime = splitStringToTime(tracker.allPausedTime);

  const differenceTime = calculateTime(timeElapsedStartTime, timeElapsedEndTime, operations.MINUS);
  const workTime = calculateTime(differenceTime, pausedTime, operations.MINUS);

  return workTime;
};

const getStatsOfWeek = (trackers: ITracker[]): JSX.Element[] => {
  const daysOfWeek: string[] = getDaysOfWeek(countDays);
  allWorkedTime = { hours: 0, minutes: 0, seconds: 0 };
  allPausedTime = { hours: 0, minutes: 0, seconds: 0 };

  return daysOfWeek.map((dayName, index) => {
    const { startDay, endDay } = getStartAndEndDay(index);
    const trackersForDay = getTrackersByRange(trackers, startDay, endDay);
    let dayWorkedTime: Time = { hours: 0, minutes: 0, seconds: 0 };
    let dayPausedTime: Time = { hours: 0, minutes: 0, seconds: 0 };

    return (
      <div key={index} className={styles.day}>
        <Text className={styles.nameDay} title={dayName} />

        {trackersForDay.length
          ?
          <div className={styles.dayInfo}>
            {trackersForDay.map((tracker) => {
              const workTime = calculateWorkTime(tracker);
              dayWorkedTime = calculateTime(dayWorkedTime, workTime);
              dayPausedTime = calculateTime(dayPausedTime, splitStringToTime(tracker.allPausedTime));
              allWorkedTime = calculateTime(allWorkedTime, workTime);
              allPausedTime = calculateTime(allPausedTime, splitStringToTime(tracker.allPausedTime));

              return (
                <div key={tracker.startTime} className={styles.trackerInfo}>
                  <div className={styles.start}>
                    {`Начало: ${new Date(tracker.startTime).toLocaleString()}`}
                  </div>

                  <div className={styles.end}>
                    {`Конец: ${new Date(tracker.endTime).toLocaleString()}`}
                  </div>

                  <div className={styles.pausedTime}>
                    {`В паузе: ${tracker.allPausedTime}`}
                  </div>

                  <div className={styles.workTime}>
                    {`Общее время работы: ${getFormattedTime(workTime)}`}
                  </div>
                </div>
              );
            })}

            <div className={styles.resultTimeDay}>
              <div className={styles.totalWorkTime}>
                {`Часов работы за день: ${getFormattedTime(dayWorkedTime)}`}
              </div>

              <div className={styles.totalPausedTime}>
                {`Часов отдыха за день: ${getFormattedTime(dayPausedTime)}`}
              </div>
            </div>
          </div>
          :
          <div className={styles.dayInfo}>В этот день вы отдыхали</div>
        }
      </div>
    );
  });
};

interface StatsProps {
  className?: string;
}

export const Stats = memo((props: StatsProps) => {
  const {
    className
  } = props;

  const dispatch = useAppDispatch();
  const { trackers } = useSelector(getTrackerState);
  const [ sortedTrackers, setSortedTrackers ] = useState<ITracker[]>(null);

  useEffect(() => {
    if (trackers) {
      const sortedArray = [ ...trackers ];
      sortedArray.sort((a, b) => {
        const dateA = new Date(a.startTime).getTime();
        const dateB = new Date(b.startTime).getTime();

        return dateB - dateA;
      });

      setSortedTrackers(sortedArray);
    }

  }, [ trackers ]);

  const getStats = useMemo(() => {
    if (sortedTrackers) {
      return getStatsOfWeek(sortedTrackers);
    } else {
      return null;
    }
  }, [ sortedTrackers ]);

  useEffect(() => {
    dispatch(getLastWeekTrackers());
  }, [ dispatch ]);

  return (
    <div className={classNames(styles.Stats, {}, [ className ])}>
      <Text className={styles.title} title={'Статистика за последние 7 дней'}/>

      {getStats}

      {allWorkedTime && allPausedTime &&
        <div className={styles.resultWeek}>
          <Text
            className={styles.result}
            title={`Общее время работы за неделю: ${getFormattedTime(allWorkedTime)}`}
          />

          <Text
            className={styles.result}
            title={`Общее время отдыха за неделю: ${getFormattedTime(allPausedTime)}`}
          />
        </div>
      }
    </div>
  );
});
