const express = require('express');
const db = require('../models');

const { Todo } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// GET /todo : 일정 가져오기
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const todo = await Todo.findAll({
      where: { UserId: req.user.id },
      order: [['sequence', 'ASC']]
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

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

// PATCH /todo/upt : 일정 수정
router.patch('/upt', isLoggedIn, async (req, res, next) => {
  try {
    await Todo.update(
      {
        category: req.body.category,
        title: req.body.title,
        content: req.body.content,
        deadline: req.body.deadline
      },
      { where: { id: req.body.id } }
    );
    const todo = await Todo.findOne({ where: { id: req.body.id } });
    res.status(200).json({ todo, TodoId: parseInt(req.body.id, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /todo/del : 일정 삭제
router.delete('/del/:todoId', isLoggedIn, async (req, res, next) => {
  try {
    await Todo.destroy({ where: { id: req.params.todoId, UserId: req.user.id } });
    res.json({ TodoId: parseInt(req.params.todoId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
