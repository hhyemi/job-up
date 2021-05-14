const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'job-up',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: 'Asia/Seoul'
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'job-up',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: 'Asia/Seoul'
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'job-up',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: 'Asia/Seoul'
  }
};
