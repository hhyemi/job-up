const Sequelize = require('sequelize');
const user = require('./user');
const category = require('./category');
const calendar = require('./calendar');
const todo = require('./todo');
const memo = require('./memo');
const comment = require('./comment');
const commty = require('./commty');
const hashtag = require('./hashtag');
const study = require('./study');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// node와 mydsql 연결
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 함수를 실행해줌
db.User = user;
db.Category = category;
db.Calendar = calendar;
db.Todo = todo;
db.Memo = memo;
db.Comment = comment;
db.Commty = commty;
db.Hashtag = hashtag;
db.Study = study;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  // 반복문으로 각 associate함수 실행하면서 연결
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
