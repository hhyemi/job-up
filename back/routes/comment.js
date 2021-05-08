const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const { User, Commty, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

// GET /commet : 댓글 목록 가져오기
router.post('/:commtyId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const commty = await Commty.findOne({
      where: { id: req.params.postId }
    });
    if (!commty) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname']
        }
      ]
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /comment/add
router.post('/add', isLoggedIn, async (req, res, next) => {
  try {
    const commty = await Commty.findOne({
      where: { id: req.body.commtyId }
    });
    if (!commty) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      CommtyId: req.body.commtyId,
      UserId: req.user.id
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'name']
        }
      ]
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
