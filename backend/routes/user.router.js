const Router = require('express').Router;
const userController = require('../controller/user.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

const router = new Router();

router.post('/user/registration',
  body('username').isLength({ min: 5, max: 15 }),
  body('password').isLength({ min: 5, max: 20 }),
  userController.registration
);
router.post('/user/login', userController.login);
router.post('/user/logout', userController.logout);
router.get('/user/refresh', userController.refresh);
router.delete('/user/delete', authMiddleware, userController.delete);

module.exports = router;