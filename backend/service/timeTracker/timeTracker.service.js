const { Op } = require('sequelize');
const TimeTracker = require('../../model/TimeTracker');
const TimeTrackerDto = require('../../dtos/timeTracker.dto');
const ApiError = require('../../exceptions/api.error');
const status = require('../../enums/status');
const getElapsedTime = require('../../utils/getTimeElapsed/getElapsedTime');
const splitStringToTime = require('../../utils/splitStringToTime/splitStringToTime');
const sumTime = require('../../utils/sumTime/sumTime');

class TimeTrackerService {
  async findCurrentTimeTracker(user) {
    const timeTracker = await TimeTracker.findOne({
      where: {
        user_id: user.user_id,
        status: {
          [Op.not]: status.FINISH
        }
      }
    });

    return timeTracker;
  }

  async start(user) {
    const timeTracker = await this.findCurrentTimeTracker(user);

    if (!timeTracker) {
      const newTimeTracker = await TimeTracker.create({
        user_id: user.user_id,
        status: status.WORK
      });

      return new TimeTrackerDto(newTimeTracker);
    } else {
      if (timeTracker.status !== status.WORK) {
        timeTracker.status = status.WORK;

        const elapsedTime = getElapsedTime(timeTracker.last_paused_time);
        const allPausedTime = splitStringToTime(timeTracker.all_paused_time);

        timeTracker.all_paused_time = sumTime(elapsedTime, allPausedTime);
        await timeTracker.save();
      }

      return new TimeTrackerDto(timeTracker);
    }
  }

  async pause(user) {
    const timeTracker = await this.findCurrentTimeTracker(user);

    if (!timeTracker) {
      throw ApiError.BadRequest(`У пользователя сегодня не был запущен учёт времени`);
    }

    if (timeTracker.status === status.WORK) {
      timeTracker.status = status.PAUSE;
      timeTracker.last_paused_time = Date.now();
    }

    await timeTracker.save();

    return new TimeTrackerDto(timeTracker);
  }

  async finish(user) {
    const timeTracker = await this.findCurrentTimeTracker(user);

    if (!timeTracker) {
      throw ApiError.BadRequest(`У пользователя сегодня не был запущен учёт времени`);
    }

    if (timeTracker.status === status.PAUSE) {
      const elapsedTime = getElapsedTime(timeTracker.last_paused_time);
      const allPausedTime = splitStringToTime(timeTracker.all_paused_time);

      timeTracker.all_paused_time = sumTime(elapsedTime, allPausedTime);
    }
    timeTracker.status = status.FINISH;
    timeTracker.end_time = Date.now();

    await timeTracker.save();

    return new TimeTrackerDto(timeTracker);
  }

  async getCurrentTimeTracker(user) {
    const timeTracker = await this.findCurrentTimeTracker(user);

    if (!timeTracker) {
      return null;
    }

    return new TimeTrackerDto(timeTracker);
  }

  async getAllTimeTrackers(user) {
    const timeTrackers = await TimeTracker.findAll({ where: { user_id: user.user_id }});

    return timeTrackers.map(tracker => new TimeTrackerDto(tracker));
  }
}

module.exports = new TimeTrackerService();