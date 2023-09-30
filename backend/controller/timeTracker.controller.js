const timeTrackerService = require('../service/timeTracker/timeTracker.service');

/**
 * @swagger
 * tags:
 *   name: TimeTracker
 *   description: Операции с трeкерами времени
 */
class TimeTrackerController {
  /**
   * @swagger
   * /api/tracker/start:
   *   post:
   *     summary: Создание или запуск текущего трекера
   *     tags: [TimeTracker]
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Токен авторизации в формате Bearer.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Успешное создание или запуск текущего трекера.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 trackingId:
   *                   type: number
   *                   description: Id трекера.
   *                 startTime:
   *                   type: string
   *                   format: date-time
   *                   description: Время запуска трекера.
   *                 allPausedTime:
   *                   type: string
   *                   format: time
   *                   description: Общее время паузы.
   *                   example: '00:00:00'
   *                 lastPausedTime:
   *                   type: string
   *                   format: date-time
   *                   description: Время начала последней пузы.
   *                 endTime:
   *                   type: string
   *                   format: date-time
   *                   description: Время, в которое трекер был завершен.
   *                 status:
   *                   type: string
   *                   description: Текущее состояние трекера.
   *                   example: 'Активен'
   */
  async start(req, res, next) {
    try {
      const { user } = req;
      const timeTracker = await timeTrackerService.start(user);

      return res.json(timeTracker);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @swagger
   * /api/tracker/pause:
   *   post:
   *     summary: Поставить трекер на паузу
   *     tags: [TimeTracker]
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Токен авторизации в формате Bearer.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Успешная остановка трекера.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 trackingId:
   *                   type: number
   *                   description: Id трекера.
   *                 startTime:
   *                   type: string
   *                   format: date-time
   *                   description: Время запуска трекера.
   *                 allPausedTime:
   *                   type: string
   *                   format: time
   *                   description: Общее время паузы.
   *                   example: '00:00:00'
   *                 lastPausedTime:
   *                   type: string
   *                   format: date-time
   *                   description: Время начала последней пузы.
   *                 endTime:
   *                   type: string
   *                   format: date-time
   *                   description: Время, в которое трекер был завершен.
   *                 status:
   *                   type: string,
   *                   description: Текущее состояние трекера.
   *                   example: 'Пауза'
   */
  async pause(req, res, next) {
    try {
      const { user } = req;
      const timeTracker = await timeTrackerService.pause(user);

      return res.json(timeTracker);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @swagger
   * /api/tracker/finish:
   *   post:
   *     summary: Завершить трекер
   *     tags: [TimeTracker]
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Токен авторизации в формате Bearer.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Успешное завершение токена.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 trackingId:
   *                   type: number
   *                   description: Id трекера.
   *                 startTime:
   *                   type: string
   *                   format: date-time
   *                   description: Время запуска трекера.
   *                 allPausedTime:
   *                   type: string
   *                   format: time
   *                   description: Общее время паузы.
   *                   example: '00:00:00'
   *                 lastPausedTime:
   *                   type: string
   *                   format: date-time
   *                   description: Время начала последней пузы.
   *                 endTime:
   *                   type: string
   *                   format: date-time
   *                   description: Время, в которое трекер был завершен.
   *                 status:
   *                   type: string,
   *                   description: Текущее состояние трекера.
   *                   example: 'Закончен'
   */
  async finish(req, res, next) {
    try {
      const { user } = req;
      const timeTracker = await timeTrackerService.finish(user);

      return res.json(timeTracker);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @swagger
   * /api/tracker/getCurrentTracker:
   *   get:
   *     summary: Получение текущего трекера или null(при его отсутствии).
   *     tags: [TimeTracker]
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Токен авторизации в формате Bearer.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Успешное получение
   *         content:
   *           application/json:
   *             schema:
   *               oneOf:
   *                - type: object
   *                  properties:
   *                    trackingId:
   *                      type: number
   *                      description: Id трекера.
   *                    startTime:
   *                      type: string
   *                      format: date-time
   *                      description: Время запуска трекера.
   *                    allPausedTime:
   *                      type: string
   *                      format: time
   *                      description: Общее время паузы.
   *                      example: '00:00:00'
   *                    lastPausedTime:
   *                      type: string
   *                      format: date-time
   *                      description: Время начала последней пузы.
   *                    endTime:
   *                      type: string
   *                      format: date-time
   *                      description: Время, в которое трекер был завершен.
   *                    status:
   *                      type: string
   *                      description: Текущее состояние трекера.
   *                      enum:
   *                        - 'Работает'
   *                        - 'Пауза'
   *                      example: 'Работает'
   *                - type: null
   *                  example: null
   */
  async getCurrentByUser(req, res, next) {
    try {
      const { user } = req;
      const timeTracker = await timeTrackerService.getCurrentTimeTracker(user);

      return res.json(timeTracker);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @swagger
   * /api/tracker/getLastWeek:
   *   get:
   *     summary: Получение всех трекеров пользователя за последние 7 дней
   *     tags: [TimeTracker]
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Токен авторизации в формате Bearer.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Успешное получение всех токенов
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   trackingId:
   *                     type: number
   *                     description: Id трекера.
   *                   startTime:
   *                     type: string
   *                     format: date-time
   *                     description: Время запуска трекера.
   *                   allPausedTime:
   *                     type: string
   *                     format: time
   *                     description: Общее время паузы.
   *                     example: '00:00:00'
   *                   lastPausedTime:
   *                     type: string
   *                     format: date-time
   *                     description: Время начала последней пузы.
   *                   endTime:
   *                     type: string
   *                     format: date-time
   *                     description: Время, в которое трекер был завершен.
   *                   status:
   *                     type: string
   *                     description: Текущее состояние трекера.
   *                     enum:
   *                       - 'Работает'
   *                       - 'Пауза'
   *                       - 'Закончен'
   *                     example: 'Закончен'
   */
  async getLastWeekByUser(req, res, next) {
    try {
      const { user } = req;
      const timeTrackers = await timeTrackerService.getLastWeek(user);

      return res.json(timeTrackers);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TimeTrackerController();