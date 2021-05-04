const express = require('express');
const db = require('../models');
const { Op } = require('sequelize');

const { Memo } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// GET /memo : 메모 가져오기
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const memo = await Memo.findAll({
      where: { UserId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.status(201).json(memo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /memo/add : 메모 추가
router.post('/add', isLoggedIn, async (req, res, next) => {
  try {
    const memo = await Memo.create({
      title: req.body.title,
      content: req.body.content,
      bookmark: req.body.bookmark,
      color: req.body.color,
      secret: req.body.secret,
      UserId: req.user.id
    });
    res.status(201).json(memo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /memo/upt : 메모 수정
router.patch('/upt', isLoggedIn, async (req, res, next) => {
  try {
    await Memo.update(
      {
        title: req.body.title,
        content: req.body.content,
        bookmark: req.body.bookmark,
        color: req.body.color,
        secret: req.body.secret
      },
      { where: { id: req.body.id } }
    );
    const memo = await Memo.findOne({ where: { id: req.body.id } });
    res.status(200).json({ memo, MemoId: parseInt(req.body.id, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /memo/del : 메모 삭제
router.delete('/del/:memoId', isLoggedIn, async (req, res, next) => {
  try {
    await Memo.destroy({ where: { id: req.params.memoId, UserId: req.user.id } });
    res.json({ MemoId: parseInt(req.params.memoId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
