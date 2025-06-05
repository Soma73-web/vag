// models/Result.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Result = sequelize.define('Result', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  college: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rank: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  }
}, {
  tableName: 'results',
  timestamps: false
});

module.exports = Result;
