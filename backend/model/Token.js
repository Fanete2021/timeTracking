const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Token = sequelize.define('token', {
  user_id: {
    type: DataTypes.INTEGER,
    onDelete: 'cascade',
    references: {
      model: User,
      key: 'user_id',
    },
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
},
  {
    timestamps: false,
    updatedAt: false
  });

module.exports = Token;