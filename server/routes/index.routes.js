const router = require('express').Router();

const authApiRouter = require('./api/authApi');
const recordsApiRouter = require('./api/recordsApi')

router.use('/api/auth', authApiRouter);
router.use('/api/records', recordsApiRouter)

module.exports = router;
