const express = require('express');
const db = require('../models');
const { Op } = require('sequelize');

const { Study, User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// GET /study : 공부시간 가져오기
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    let query = `SELECT * FROM study WHERE UserId = ${req.user.id}`;
    let countQuery = '';
    if (req.body.startDate) {
      query += ` AND DATE_FORMAT(createdAt , "%Y-%m-%d") >= '${req.body.startDate.substring(0, 10)}'`;
    }
    if (req.body.endDate) {
      query += ` AND DATE_FORMAT(createdAt , "%Y-%m-%d") <= '${req.body.endDate.substring(0, 10)}'`;
    }
    query += ' ORDER BY createdAt DESC';
    countQuery = query;
    query += ` LIMIT 9 OFFSET ${req.body.offset}`;

    // 공부데이터
    const study = await db.sequelize.query(query, {
      type: db.Sequelize.QueryTypes.SELECT,
      raw: true
    });

    // 공부데이터 총 개수
    const studyCnt = await db.sequelize.query(countQuery, {
      type: db.Sequelize.QueryTypes.SELECT,
      raw: true
    });

    res.status(201).json({ study, studyCnt });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /study : 주간 공부시간 가져오기
router.get('/week', isLoggedIn, async (req, res, next) => {
  try {
    let query = `SELECT SUM(time) AS time, DATE_FORMAT(createdAt , "%Y-%m-%d")  AS day
                  FROM study WHERE DATE_FORMAT(createdAt , "%Y-%m-%d") > DATE_ADD(NOW(),INTERVAL -7 DAY) 
                    GROUP BY DATE_FORMAT(createdAt , "%Y-%m-%d")`;
    const study = await db.sequelize.query(query, {
      type: db.Sequelize.QueryTypes.SELECT,
      raw: true
    });
    res.status(201).json(study);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /study/today : 일간 공부시간 가져오기
router.get('/today', isLoggedIn, async (req, res, next) => {
  try {
    let query = `SELECT * FROM study
                WHERE UserId = ${req.user.id} AND DATE_FORMAT(createdAt , "%Y-%m-%d") = CURDATE()`;
    const study = await db.sequelize.query(query, {
      type: db.Sequelize.QueryTypes.SELECT,
      raw: true
    });
    res.status(201).json(study);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /study/add : 공부시간 추가
router.post('/add', isLoggedIn, async (req, res, next) => {
  try {
    const study = await Study.create({
      time: req.body.time,
      UserId: req.user.id
    });
    res.status(201).json(study);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// // DELETE /study/del : 공부시간 삭제
// router.delete('/del/:studyId', isLoggedIn, async (req, res, next) => {
//   try {
//     await study.destroy({ where: { id: req.params.studyId, UserId: req.user.id } });
//     res.json({ studyId: parseInt(req.params.studyId, 10) });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

module.exports = router;
