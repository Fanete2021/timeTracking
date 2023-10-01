import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Tracker.module.scss';
import { FC, useCallback, useEffect, useState } from 'react';
import { Button, ButtonTheme, Text, Time, Timer } from 'shared/ui';
import { status } from '../../model/types/tracker';
import { getCurrentTracker } from '../../model/services/getCurrentTracker';
import { useSelector } from 'react-redux';
import { startTracker } from '../../model/services/startTracker';
import { getTimeElapsed } from 'shared/lib/getTimeElapsed/getTimeElapsed';
import { calculateTime, operations } from 'shared/lib/calculateTime/calculateTime';
import { splitStringToTime } from 'shared/lib/splitStringToTime/splitStringToTime';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getTrackerState } from '../../model/selectors/getTrackerState';
import { pauseTracker } from '../../model/services/pauseTracker';
import { finishTracker } from '../../model/services/finishTracker';
import { trackerActions } from '../../model/slice/trackerSlice';

interface TrackerProps {
  className?: string;
  isDisabled?: boolean;
}

export const Tracker: FC<TrackerProps> = (props) => {
  const {
    className,
    isDisabled
  } = props;

  const dispatch = useAppDispatch();
  const { currentTracker } = useSelector(getTrackerState);
  const [ timeElapsed, setTimeElapsed ] = useState<Time | null>(null);
  const [ pausedTime, setPausedTime ] = useState<Time | null>(null);

  useEffect(() => {
    if (isDisabled) {
      dispatch(getCurrentTracker());
    }
  }, [ dispatch, isDisabled ]);

  useEffect(() => {
    if (currentTracker) {
      const timeElapsedStartTime = getTimeElapsed(new Date(currentTracker.startTime));

      const timeElapsedLastPausedTime = currentTracker.status === status.PAUSE
        ? getTimeElapsed(new Date(currentTracker.lastPausedTime))
        : null;

      const pausedTime = splitStringToTime(currentTracker.allPausedTime);
      const allPausedTime = timeElapsedLastPausedTime
        ? calculateTime(pausedTime, timeElapsedLastPausedTime)
        : pausedTime;

      const differenceTime = calculateTime(timeElapsedStartTime, allPausedTime, operations.MINUS);

      setTimeElapsed(differenceTime);
      setPausedTime(allPausedTime);
    } else {
      setTimeElapsed(null);
      setPausedTime(null);
    }
  }, [ currentTracker, setTimeElapsed ]);

  const onStart = useCallback(async () => {
    dispatch(startTracker());
  }, [ dispatch ]);

  const onPause = useCallback(async () => {
    dispatch(pauseTracker());
  }, [ dispatch ]);

  const onFinish = useCallback(async () => {
    dispatch(finishTracker());
    dispatch(trackerActions.currentTrackerReset());
  }, [ dispatch ]);

  const isStartButtonDisabled = useCallback(() => {
    //Необходим правильный порядок, поэтому раздельные блоки из условий, иначе вместе они вернут неправильное значение.
    //Так как при isDisabled currentTracker равен null
    //Сначала проверка переданного пропса. Тогда нельзя нажать.
    if (!isDisabled) {
      return true;
    }

    //Потом проверка, что трекера нет, иначе его можно создать. Можно нажать
    if (!currentTracker) {
      return false;
    }

    //И финальная проверка, что статус текущий WORK. Нельзя нажать
    return currentTracker.status === status.WORK;
  }, [ isDisabled, currentTracker ]);

  const isPauseButtonDisabled = useCallback(() => {
    return !currentTracker || currentTracker.status === status.PAUSE || currentTracker.status === status.FINISH;
  }, [ currentTracker ]);

  return (
    <div className={classNames(styles.Tracker, {}, [ className ])}>
      <div className={styles.stats}>
        <div className={styles.timer}>
          <Text title={'Время работы'}/>

          <Timer
            time={timeElapsed}
            isWork={isDisabled && currentTracker && currentTracker.status === status.WORK}
          />
        </div>

        <div className={styles.timer}>
          <Text title={'Время отдыха'}/>

          <Timer
            time={pausedTime}
            isWork={isDisabled && currentTracker && currentTracker.status === status.PAUSE}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          className={styles.btn}
          disabled={isStartButtonDisabled()}
          onClick={onStart}
          theme={ButtonTheme.OUTLINE}
        >
          {(!currentTracker || currentTracker.status === status.FINISH)
            ? 'Создать'
            : 'Продолжить'
          }
        </Button>

        <Button
          className={styles.btn}
          onClick={onPause}
          disabled={isPauseButtonDisabled()}
          theme={ButtonTheme.OUTLINE}
        >
          Ушел курить
        </Button>

        <Button
          className={styles.btn}
          onClick={onFinish}
          disabled={!(currentTracker && currentTracker.status !== status.FINISH)}
          theme={ButtonTheme.OUTLINE}
        >
          Закончил
        </Button>
      </div>
    </div>
  );
};
