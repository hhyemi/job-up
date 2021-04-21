const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');
const axios = require('axios');

const { Calendar, Category } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

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
    console.log(category);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /cat/category : 카테고리 추가
router.post('/category', isLoggedIn, async (req, res, next) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      color: req.body.color,
      UserId: req.user.id
    });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
