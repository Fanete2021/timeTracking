require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.router');
const timeTrackerRouter = require('./routes/timeTracker.router');
const sequelize = require('./db');
const errorMiddleware = require('./middleware/error.middleware');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

sequelize.sync({ force: false })
  .then(() => {
    app.use('/api', userRouter);
    app.use('/api', timeTrackerRouter);
    app.use(errorMiddleware);

    app.listen(PORT, () => {});
  })
  .catch((error) => {
    console.error('Ошибка подключения к базе данных:', error);
  });