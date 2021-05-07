const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const { User, Commty, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

// GET /commty : 커뮤니티 가져오기
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.body.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.body.lastId, 10) };
    }
    const commty = await Commty.findAll({
      offset: req.body.offset,
      limit: 20,
      include: [
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ['id', 'name']
            }
          ]
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'name']
        },
        {
          model: User, // 좋아요 누른사람
          as: 'Likers', // 구분
          attributes: ['id']
        }
      ],
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC']
      ]
    });
    const commtyCnt = await Commty.findAndCountAll();
    res.status(201).json({ commty, commtyCnt });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /commty/add : 커뮤니티 등록
router.post('/add', isLoggedIn, async (req, res, next) => {
  try {
    const hashtags = req.body.title.match(/#[^\s#]+/g);
    const commty = await Commty.create({
      title: req.body.title,
      content: req.body.content,
      views: 0,
      UserId: req.user.id
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() }
          })
        )
      );
      await commty.addHashtags(result.map((v) => v[0]));
    }
    const fullCommty = await Commty.findOne({
      where: { id: commty.id },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ['id', 'name']
            }
          ]
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'name']
        },
        {
          model: User, // 좋아요 누른사람
          as: 'Likers', // 구분
          attributes: ['id']
        }
      ]
    });
    res.status(201).json(fullCommty);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
