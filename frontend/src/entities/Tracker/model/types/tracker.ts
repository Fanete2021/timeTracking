export enum status {
  FINISH = 'Закончен',
  PAUSE = 'Пауза',
  WORK = 'Работает'
}

export interface ITracker {
  trackingId: number;
  startTime: string;
  allPausedTime: string;
  lastPausedTime: string;
  endTime: string;
  status: status;
}

export interface TrackerSchema {
  trackers?: ITracker[];
  currentTracker?: ITracker;
  isLoading?: boolean;
  error?: string;
}