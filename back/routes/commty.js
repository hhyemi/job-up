const express = require('express');

const { User, Commty, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// POST /commty/add
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
