const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const { User, Commty, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

// GET /commet : 댓글 목록 가져오기
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const commty = await Commty.findOne({
      where: { id: parseInt(req.body.commtyId, 10) }
    });
    if (!commty) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.findAll({
      where: { commtyId: parseInt(req.body.commtyId, 10) },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'src']
        }
      ]
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /comment/add : 댓글 추가
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
          attributes: ['id', 'name', 'src']
        }
      ]
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /comment/upt : 댓글 수정
router.patch('/upt', isLoggedIn, async (req, res, next) => {
  try {
    await Comment.update(
      {
        content: req.body.content
      },
      { where: { id: req.body.id } }
    );
    const comment = await Comment.findOne({
      where: { id: req.body.id },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'src']
        }
      ]
    });
    res.status(200).json({ comment, CommentId: parseInt(req.body.id, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /comment/del : 댓글 삭제
router.delete('/del/:commentId', isLoggedIn, async (req, res, next) => {
  try {
    await Comment.destroy({ where: { id: req.params.commentId, UserId: req.user.id } });
    res.json({ CommentId: parseInt(req.params.commentId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
