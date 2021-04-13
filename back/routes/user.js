const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// POST /user/signUp : 회원가입
router.post('/signUp', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 이메일입니다.');
    }

    let hashedPassword = req.body.password;
    if (!req.body.social) {
      // 소셜로그인이 아닐때
      hashedPassword = await bcrypt.hash(req.body.password, 10); // 비밀번호 암호화 (해시화) , 숫자 클수록 보안강화
    }
    await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user/login : 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        }
        // include: [
        //   {
        //     model: Post,
        //     attributes: ['id']
        //   },
        //   {
        //     model: User,
        //     as: 'Followings',
        //     attributes: ['id']
        //   },
        //   {
        //     model: User,
        //     as: 'Followers',
        //     attributes: ['id']
        //   }
        // ]
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// POST /user/socialLogIn : 소셜로그인
router.post('/socialLogIn', isNotLoggedIn, async (req, res, next) => {
  const fullUserWithoutPassword = await User.findOne({
    where: { email: req.body.email },
    attributes: {
      exclude: ['password']
    }
  });
  return res.status(200).json(fullUserWithoutPassword);
});

// POST /user/logout : 로그아웃
router.post('/logout', isLoggedIn, async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

// 로그인 유지
router.get('/', async (req, res, next) => {
  console.log(req.headers);
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        }
        //     {
        //         include: [
        //         model: Post,
        //         attributes: ['id'] // 데이터 개수만 가져오기 위한 (내용은 필요없음 )
        //       },
        //       {
        //         model: User,
        //         as: 'Followings',
        //         attributes: ['id']
        //       },
        //       {
        //         model: User,
        //         as: 'Followers',
        //         attributes: ['id']
        //       }
        //     ]
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
