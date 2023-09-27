const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const status = require('../enums/status');

const TimeTracker = sequelize.define('time_tracker', {
  tracking_id: {
    type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    onDelete: 'cascade',
    references: {
      model: User,
      key: 'user_id'
    },
    allowNull: false
  },
  start_time: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
    time: true
  },
  all_paused_time: {
    type: DataTypes.TIME,
    defaultValue: '00:00:00'
  },
  last_paused_time: {
    type: DataTypes.DATE,
    time: true
  },
  end_time: {
    type: DataTypes.DATE,
    time: true
  },
  status: {
    type: DataTypes.ENUM(status.WORK, status.PAUSE, status.FINISH),
    allowNull: false,
  }
},
{
  timestamps: false,
  updatedAt: false
});

module.exports = TimeTracker;