const jwt = require('jsonwebtoken');
const jwtConfig = require('../middleware/jwtConfig');

// функция генирации токена, принимает в себя полезную нагрузку
const generateTokens = (payload) => ({
  accessToken: jwt.sign(payload, 'A', {
    expiresIn: jwtConfig.access.expiresIn,
  }),
  refreshToken: jwt.sign(payload, 'R', {
    expiresIn: jwtConfig.refresh.expiresIn,
  }),
});

module.exports = generateTokens;
