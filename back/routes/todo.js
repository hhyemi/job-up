const express = require('express');
const db = require('../models');

const { Todo } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// POST /todo/add : 일정 추가
router.post('/add', isLoggedIn, async (req, res, next) => {
  try {
    await Todo.findAll({
      attributes: [[db.sequelize.fn('MAX', db.sequelize.col('sequence')), 'maxId']],
      raw: true
    }).then(async function (result) {
      const todo = await Todo.create({
        sequence: result[0].maxId + 1,
        category: req.body.category,
        title: req.body.title,
        content: req.body.content,
        deadline: req.body.deadline,
        UserId: req.user.id
      });
      res.status(201).json(todo);
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
