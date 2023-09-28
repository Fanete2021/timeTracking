require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.router');
const timeTrackerRouter = require('./routes/timeTracker.router');
const sequelize = require('./db');
const errorMiddleware = require('./middleware/error.middleware');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Time tracking with Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`
      }
    ]
  },
  apis: ['./controller/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', userRouter);
app.use('/api', timeTrackerRouter);
app.use(errorMiddleware);

sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {});
  })
  .catch((error) => {
    console.error('Ошибка подключения к базе данных:', error);
  });