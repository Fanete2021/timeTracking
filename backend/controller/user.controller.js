const userService = require('../service/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api.error');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Операции с пользователем
 */
class UserController {
  /**
   * @swagger
   * /api/user/registration:
   *   post:
   *     summary: Регистрация нового пользователя
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: Имя пользователя.
   *               password:
   *                 type: string
   *                 description: Пароль пользователя.
   *             required:
   *               - username
   *               - password
   *     responses:
   *       '200':
   *         description: Успешная регистрация.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *                   description: Токен доступа.
   *                 refreshToken:
   *                   type: string
   *                   description: Токен обновления.
   *                 user:
   *                   type: object
   *                   description: Объект пользователя.
   *                   properties:
   *                      user_id:
   *                        type: number
   *                        description: Id пользователя.
   *                      username:
   *                        type: string
   *                        description: Имя пользователя.
   */
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }

      const { username, password } = req.body;
      const userData = await userService.registration(username, password);

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @swagger
   * /api/user/login:
   *   post:
   *     summary: Авторазиция
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: Имя пользователя.
   *               password:
   *                 type: string
   *                 description: Пароль пользователя.
   *             required:
   *               - username
   *               - password
   *     responses:
   *       '200':
   *         description: Успешная регистрация.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *                   description: Токен доступа.
   *                 refreshToken:
   *                   type: string
   *                   description: Токен обновления.
   *                 user:
   *                   type: object
   *                   description: Объект пользователя.
   *                   properties:
   *                      user_id:
   *                        type: number
   *                        description: Id пользователя.
   *                      username:
   *                        type: string
   *                        description: Имя пользователя.
   */
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const userData = await userService.login(username, password);

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @swagger
   * /api/user/logout:
   *   post:
   *     summary: Выход из системы
   *     tags: [User]
   *     responses:
   *      '200':
   *        description: Успешный выход из системы.
   */
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);

      res.clearCookie('refreshToken');
      return res.status(200).json();
    } catch (e) {
      next(e);
    }
  }

  /**
   * @swagger
   * /api/user/refresh:
   *   get:
   *     summary: Обновление refreshToken'а
   *     tags: [User]
   *     responses:
   *      '200':
   *        description: Успешное обновление.
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                accessToken:
   *                  type: string
   *                  description: Токен доступа.
   *                refreshToken:
   *                  type: string
   *                  description: Токен обновления.
   *                user:
   *                  type: object
   *                  description: Объект пользователя.
   *                  properties:
   *                     user_id:
   *                       type: number
   *                       description: Id пользователя.
   *                     username:
   *                       type: string
   *                       description: Имя пользователя.
   */
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @swagger
   * /api/user/delete:
   *   delete:
   *     summary: Удаление пользователя
   *     tags: [User]
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Токен авторизации в формате Bearer.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *      '200':
   *        description: Успешное удаление.
   */
  async delete(req, res, next) {
    try {
      const { user } = req;
      await userService.delete(user);

      res.clearCookie('refreshToken');
      return res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();