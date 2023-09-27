require('dotenv').config();
const sequelize = require('../db');
const User = require('../model/User');
const TimeTracking = require('../model/TimeTracker');
const Token = require('../model/Token');

console.log('Начало')
sequelize.sync({ force: true })
  .then(() => {
    console.log('Таблицы были созданы');
  })
  .catch((error) => {
    console.error('Ошибка подключения к базе данных:', error);
  });