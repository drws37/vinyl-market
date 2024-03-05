const router = require('express').Router();
const {User, SellersComment, Record, Seller} = require('../../db/models')

router.post('/comment', async (req, res) => {
  try {
    console.log(req.body);
    const {seller_id, comment} = req.body

    if(res.locals.user){
      console.log(123123);
      const commentAdd = await SellersComment.create({seller_id, comment, user_id:res.locals.user.id})
      res.json({comment})
    }
  


  } catch ({message}) {
    res.json({type: 'comment router', message})
  }
})


router.get('/comments/:id', async (req, res) => {
  try {
    const {id} = req.params
    console.log(+id);
    const seller = await Seller.findOne({where: {user_id:+id}})
    const comments = await SellersComment.findAll({where:{seller_id:seller.id}})
    res.json(comments)
  } catch ({message}) {
    res.json({type: 'comment router', message})
  }
})

module.exports = router;