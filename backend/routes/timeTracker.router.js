const Router = require('express').Router;
const timeTrackerController = require('../controller/timeTracker.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = new Router();

router.post('/tracker/start', authMiddleware, timeTrackerController.start);
router.post('/tracker/pause', authMiddleware, timeTrackerController.pause);
router.post('/tracker/finish', authMiddleware, timeTrackerController.finish);
router.get('/tracker/getCurrentTracker', authMiddleware, timeTrackerController.getCurrentByUser);
router.get('/tracker/getLastWeek', authMiddleware, timeTrackerController.getLastWeekByUser);

module.exports = router;