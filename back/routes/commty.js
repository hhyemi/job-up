const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const { User, Commty, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

// GET /commty : 커뮤니티 목록 가져오기
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
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'name']
            }
          ]
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

// GET /commty/1 : 커뮤니티 상세보기
router.get('/:commtyId', async (req, res, next) => {
  try {
    const commty = await Commty.findOne({
      where: { id: req.params.commtyId }
    });
    if (!commty) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullCommty = await Commty.findOne({
      where: { id: commty.id },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'src']
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id', 'name']
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'src']
            }
          ]
        }
      ]
    });
    res.status(203).json(fullCommty);
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

// PATCH /commty/upt : 커뮤니티 수정
router.patch('/upt', isLoggedIn, async (req, res, next) => {
  try {
    await Commty.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      { where: { id: req.body.id } }
    );
    const commty = await Commty.findOne({ where: { id: req.body.id } });
    res.status(200).json({ Commty, CommtyId: parseInt(req.body.id, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /commty/del : 커뮤니티 삭제
router.delete('/del/:commtyId', isLoggedIn, async (req, res, next) => {
  try {
    await Commty.destroy({ where: { id: req.params.commtyId, UserId: req.user.id } });
    res.json({ CommtyId: parseInt(req.params.commtyId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /commty/1/like : 좋아요
router.patch('/:commtyId/like', isLoggedIn, async (req, res, next) => {
  try {
    const commty = await Commty.findOne({ where: { id: req.params.commtyId } });
    if (!commty) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await commty.addLikers(req.user.id);
    res.json({ CommtyId: commty.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/1/unlike : 좋아요취소
router.delete('/:commtyId/unlike', isLoggedIn, async (req, res, next) => {
  try {
    const commty = await Commty.findOne({ where: { id: req.params.commtyId } });
    if (!commty) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await commty.removeLikers(req.user.id);
    res.json({ CommtyId: commty.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/hashtag', async (req, res, next) => {
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
          model: Hashtag,
          where: { name: decodeURIComponent(req.body.tag) } // include안에서 조건 가능 , 해시태그는 여기에있기 때문에
        },
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
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC']
      ]
    });
    const commtyCnt = await Commty.findAndCountAll({
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.body.tag) }
        }
      ]
    });
    res.status(201).json({ commty, commtyCnt });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
