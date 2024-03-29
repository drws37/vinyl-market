const express = require('express');
const bcrypt = require('bcrypt');
const generateTokens = require('../../utils/authUtils');
const cookiesConfig = require('../../middleware/cookiesConfig');
const configJWT = require('../../middleware/jwtConfig');
const { User, Seller } = require('../../db/models');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profileImg');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/registration', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (username && email && password && role) {
      const globalRegex =
        /^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;

      if (globalRegex.test(email)) {
        let user = await User.findOne({ where: { email } });
        if (user) {
          res
            .status(400)
            .json({ message: 'Такой пользователь уже существует' });
        } else {
          const hash = await bcrypt.hash(password, 10);
          user = await User.create({
            username,
            email,
            password: hash,
            role,
            img: '/profileImg/user.png',
          });
          if (role === 'seller') {
            await Seller.create({
              phone: 'не предоставлен',
              adress: 'не предоставлен',
              itn: 'не предоставлен',
              user_id: user.id,
            });
          }
          const { accessToken, refreshToken } = generateTokens({
            user: { username: user.username, id: user.id, role: user.role },
          });
          res.cookie(cookiesConfig.access, accessToken, {
            maxAge: cookiesConfig.maxAgeAccess,
            httpOnly: true,
          });
          res.cookie(cookiesConfig.refresh, refreshToken, {
            maxAge: cookiesConfig.maxAgeRefresh,
            httpOnly: true,
          });
          res.status(201).json({
            message: 'success',
            user,
          });
        }
      } else {
        res
          .status(400)
          .json({ message: 'Ваша почта не соответствует формату' });
      }
    } else {
      res.status(400).json({ message: 'Заполните все поля' });
    }
  } catch ({ message }) {
    res.status(500).json(message);
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        const { accessToken, refreshToken } = generateTokens({
          user: { email: email, id: user.id, role: user.role },
        });

        res.cookie(cookiesConfig.access, accessToken, {
          maxAge: cookiesConfig.maxAgeAccess,
          httpOnly: true,
        });
        res.cookie(cookiesConfig.refresh, refreshToken, {
          maxAge: cookiesConfig.maxAgeRefresh,
          httpOnly: true,
        });
        res.status(200).json({ message: 'success', user });
      } else {
        res.status(400).json({ message: 'логин или пароль не верный' });
      }
    } else {
      res.status(400).json({ message: 'Заполните все поля' });
    }
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

router.get('/check', async (req, res) => {
  if (res.locals.user) {
    const user = await User.findOne({
      where: { id: res.locals.user.id },
      attributes: { exclude: ['password'] },
    });
    res.json({ user });
    return;
  }
  res.json({ user: null });
});

router.get('/logout', (req, res) => {
  res.clearCookie(configJWT.access.type).clearCookie(configJWT.refresh.type);
  res.json({ message: 'success' });
});

router.put('/update/:userId', upload.single('img'), async (req, res) => {
  const { userId } = req.params;
  try {
    const { username, email } = req.body;

    let newFileUrl = null;
    if (req.file) {
      newFileUrl = `/profileImg/${req.file.originalname}`;
    }
    const user = await User.findOne({ where: { id: +userId } });

    if (newFileUrl) {
      await user.update(
        { username, email, img: newFileUrl },
        { where: { id: res.locals.user.id } }
      );
    } else {
      await user.update(
        { username, email },
        { where: { id: res.locals.user.id } }
      );
    }
    res.json(user);
  } catch ({ message }) {
    res.json({ type: 'auth router', message });
  }
});

module.exports = router;
