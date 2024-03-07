const router = require('express').Router();
const {User, Seller, Record} = require('../../db/models')

router.get('/:shopId', async (req, res) => {
  try {
    const {shopId} = req.params
    const user = await User.findOne({include: {model: Seller}, where: {id:+shopId}})
    const record = await Record.findAll({where: {user_id:user.id}})
    res.json({user, record})
  } catch ({message}) {
    res.json({type: 'shop router', message})
  }
})

module.exports = router;