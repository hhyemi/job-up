const express = require('express');
const db = require('../models');

const { Calendar, Category } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// // GET /cal : 달력 가져오기
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    let query = `SELECT 
                  calendar.* , category.color, category.bgColor, category.borderColor , category.dragBgColor 
                FROM category, calendar 
                WHERE calendar.calendarId = category.id;`;
    const calendar = await db.sequelize.query(query, {
      type: db.Sequelize.QueryTypes.SELECT,
      raw: true
    });
    res.status(201).json(calendar);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /cal/add : 달력 추가
router.post('/add', isLoggedIn, async (req, res, next) => {
  try {
    const calendar = await Calendar.create({
      calendarId: req.body.calendarId,
      category: req.body.category,
      isVisible: true,
      title: req.body.title,
      location: req.body.location,
      state: req.body.state,
      start: req.body.start,
      end: req.body.end,
      CategoryId: req.body.calendarId,
      UserId: req.user.id
    });
    res.status(201).json(calendar);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /cal/del : 달력 삭제
router.delete('/del/:calId', isLoggedIn, async (req, res, next) => {
  try {
    await Calendar.destroy({
      where: { id: req.params.calId }
    });
    res.status(201).json({ CalId: parseInt(req.params.calId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /cal/upt : 달력 수정
router.patch('/upt', isLoggedIn, async (req, res, next) => {
  try {
    await Calendar.update(
      {
        calendarId: req.body.calendarId,
        category: req.body.category,
        isVisible: true,
        title: req.body.title,
        location: req.body.location,
        state: req.body.state,
        start: req.body.start,
        end: req.body.end,
        CategoryId: req.body.calendarId
      },
      { where: { id: req.body.id, UserId: req.user.id } }
    );
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
