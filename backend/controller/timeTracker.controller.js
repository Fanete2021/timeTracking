const timeTrackerService = require('../service/timeTracker.service');

class TimeTrackerController {
  async start(req, res, next) {
    try {
      const { user } = req;
      const timeTracker = await timeTrackerService.start(user);

      return res.json(timeTracker);
    } catch (e) {
      next(e);
    }
  }

  async pause(req, res, next) {
    try {
      const { user } = req;
      const timeTracker = await timeTrackerService.pause(user);

      return res.json(timeTracker);
    } catch (e) {
      next(e);
    }
  }

  async finish(req, res, next) {
    try {
      const { user } = req;
      const timeTracker = await timeTrackerService.finish(user);

      return res.json(timeTracker);
    } catch (e) {
      next(e);
    }
  }

  async getCurrentByUser(req, res, next) {
    try {
      const { user } = req;
      const timeTracker = await timeTrackerService.getCurrentTimeTracker(user);

      return res.json(timeTracker);
    } catch (e) {
      next(e);
    }
  }

  async getAllByUser(req, res, next) {
    try {
      const { user } = req;
      const timeTrackers = await timeTrackerService.getAllTimeTrackers(user);

      return res.json(timeTrackers);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TimeTrackerController();