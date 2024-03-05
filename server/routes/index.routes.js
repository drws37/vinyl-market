const router = require('express').Router();

const authApiRouter = require('./api/authApi');
const recordsApiRouter = require('./api/recordsApi')
const categoriesApiRouter = require('./api/categoriesApi')
const ordersApiRouter = require('./api/orderApi')
const favoriteApiRouter = require('./api/favoriteApi')
const shopApiRouter = require('./api/shopApi')




router.use('/api/auth', authApiRouter);
router.use('/api/records', recordsApiRouter)
router.use('/api/categories', categoriesApiRouter)
router.use('/api/order', ordersApiRouter)
router.use('/api/favorite', favoriteApiRouter)
router.use('/api/magazine', shopApiRouter)




module.exports = router;
