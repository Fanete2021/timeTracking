const TimeTrackerService = require('./timeTracker.service');
const TimeTracker = require('../../model/TimeTracker');
const status = require('../../enums/status');
const getElapsedTime = require('../../utils/getTimeElapsed/getElapsedTime');
const sumTime = require('../../utils/sumTime/sumTime');
const splitStringToTime = require('../../utils/splitStringToTime/splitStringToTime');
const { Op } = require('sequelize');

const mockTimeTracker = {
  user_id: 1,
  status: status.WORK,
  tracking_id: 1,
  start_time: new Date('2023-09-28T06:41:29'),
  all_paused_time: '0:0:0',
  last_paused_time: new Date('2023-09-28T06:51:29'),
  end_time: null,
  save: jest.fn()
};

const mockUser = {
  user_id: 1,
};

jest.mock('../../model/TimeTracker', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn()
}));

describe('TimeTrackerService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findCurrentTimeTracker', async () => {
    const timeTracker = {...mockTimeTracker};
    TimeTracker.findOne.mockResolvedValue(timeTracker);

    const currentTimeTracker = await TimeTrackerService.findCurrentTimeTracker(mockUser);

    expect(TimeTracker.findOne).toHaveBeenCalledWith({
      where: {
        user_id: mockUser.user_id,
        status: {
          [Op.not]: status.FINISH,
        },
      },
    });

    expect(currentTimeTracker).toEqual(mockTimeTracker);
  });

  it('start should create', async () => {
    const timeTracker = {...mockTimeTracker};
    TimeTracker.findOne.mockResolvedValue(null);
    TimeTracker.create.mockResolvedValue(timeTracker);

    await TimeTrackerService.start(mockUser);

    expect(TimeTracker.create).toHaveBeenCalledWith({
      user_id: mockUser.user_id,
      status: status.WORK
    });
  });

  it('start should change status', async () => {
    const timeTracker = {...mockTimeTracker};
    timeTracker.status = status.PAUSE;
    TimeTracker.findOne.mockResolvedValue(timeTracker);

    const result = await TimeTrackerService.start(mockUser);

    expect(result.status).toBe(status.WORK);
  });

  it('pause should change status', async () => {
    const timeTracker = {...mockTimeTracker};
    timeTracker.status = status.WORK;
    TimeTracker.findOne.mockResolvedValue(timeTracker);

    const result = await TimeTrackerService.pause(mockUser);

    expect(result.status).toBe(status.PAUSE);
  });

  it('pause should not change status', async () => {
    const timeTracker = {...mockTimeTracker};
    timeTracker.status = status.FINISH;
    TimeTracker.findOne.mockResolvedValue(timeTracker);

    const result = await TimeTrackerService.pause(mockUser);

    expect(result.status).toBe(status.FINISH);
  });

  it('finish should only change status and end time', async () => {
    const timeTracker = {...mockTimeTracker};
    timeTracker.status = status.WORK;
    TimeTracker.findOne.mockResolvedValue(timeTracker);

    const originalDateNow = Date.now();
    Date.now = jest.fn(() => originalDateNow);

    const result = await TimeTrackerService.finish(mockUser);

    expect(result.status).toBe(status.FINISH);
    expect(result.end_time).toBe(originalDateNow);
  });

  it('finish should change status, end time and all paused time', async () => {
    const timeTracker = {...mockTimeTracker};
    timeTracker.status = status.PAUSE;
    TimeTracker.findOne.mockResolvedValue(timeTracker);

    const originalDateNow = Date.now();
    Date.now = jest.fn(() => originalDateNow);

    const elapsedTime = getElapsedTime(timeTracker.last_paused_time);
    const allPausedTime = splitStringToTime(timeTracker.all_paused_time);
    const resultSumTime = sumTime(elapsedTime, allPausedTime);

    const result = await TimeTrackerService.finish(mockUser);

    expect(result.status).toBe(status.FINISH);
    expect(result.end_time).toBe(originalDateNow);
    expect(result.all_paused_time).toBe(resultSumTime);
  });

  it('getCurrentTimeTracker should return time tracker', async () => {
    const timeTracker = {...mockTimeTracker};
    TimeTracker.findOne.mockResolvedValue(timeTracker);

    const result = await TimeTrackerService.getCurrentTimeTracker(mockUser);

    expect(result.tracking_id).toBe(timeTracker.tracking_id);
  });

  it('getCurrentTimeTracker should return null', async () => {
    TimeTracker.findOne.mockResolvedValue(null);

    const timeTracker = await TimeTrackerService.getCurrentTimeTracker(mockUser);

    expect(timeTracker).toBe(null);
  });

  it('getAllTimeTrackers should return time trackers', async () => {
    TimeTracker.findAll.mockResolvedValue([
      mockTimeTracker,
      mockTimeTracker,
      mockTimeTracker
    ]);

    const timeTrackers = await TimeTrackerService.getAllTimeTrackers(mockUser);

    expect(timeTrackers.length).toBe(3);
  });
});