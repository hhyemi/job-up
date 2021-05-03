const express = require('express');
const db = require('../models');
const { Op } = require('sequelize');

const { Memo } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// POST /memo/add : 메모 추가
router.post('/add', isLoggedIn, async (req, res, next) => {
  try {
    const memo = await Memo.create({
      title: req.body.title,
      content: req.body.content,
      bookmark: req.body.bookmark,
      UserId: req.user.id
    });
    res.status(201).json(memo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
