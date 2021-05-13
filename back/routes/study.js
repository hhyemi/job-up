const express = require('express');
const db = require('../models');
const { Op } = require('sequelize');

const { Study } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// // GET /study : 공부시간 가져오기
// router.get('/', isLoggedIn, async (req, res, next) => {
//   try {
//     const where = { UserId: req.user.id };
//     // 초기 로딩이 아닐 때
//     if (parseInt(req.query.lastId, 10)) {
//       where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }; // lastId보다 작은
//     }
//     const study = await study.findAll({
//       where,
//       limit: 12,
//       order: [['createdAt', 'DESC']]
//     });
//     res.status(201).json(study);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

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

// // PATCH /study/upt : 공부시간 수정
// router.patch('/upt', isLoggedIn, async (req, res, next) => {
//   try {
//     await study.update(
//       {
//         title: req.body.title,
//         content: req.body.content,
//         color: req.body.color,
//         secret: req.body.secret
//       },
//       { where: { id: req.body.id } }
//     );
//     const study = await study.findOne({ where: { id: req.body.id } });
//     res.status(200).json({ study, studyId: parseInt(req.body.id, 10) });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

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
