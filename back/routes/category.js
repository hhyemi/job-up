const express = require('express');
const db = require('../models');

const { Category, Calendar } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// GET /cat : 카테고리 가져오기
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const category = await Category.findAll({
      where: { UserId: req.user.id },
      order: [
        ['createdAt', 'DESC'] //  생성일 먼저
      ]
    });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /cat/add : 카테고리 추가
router.post('/add', isLoggedIn, async (req, res, next) => {
  try {
    await Category.findAll({
      // id 최대값 찾기
      attributes: [[db.sequelize.fn('MAX', db.sequelize.col('id')), 'maxId']],
      raw: true
    }).then(async function (result) {
      const category = await Category.create({
        id: String(result[0].maxId * 1 + 1),
        name: req.body.name,
        color: '#000',
        bgColor: req.body.color,
        borderColor: req.body.color,
        dragBgColor: req.body.color,
        UserId: req.user.id
      });
      res.status(201).json(category);
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /cat/del : 카테고리 삭제
router.delete('/del', isLoggedIn, async (req, res, next) => {
  try {
    await Category.destroy({
      where: { id: req.body.checkItems }
    });
    await Calendar.update(
      {
        calendarId: '1'
      },
      { where: { calendarId: req.body.checkItems, UserId: req.user.id } }
    );
    res.status(201).json({ id: req.body.checkItems });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
