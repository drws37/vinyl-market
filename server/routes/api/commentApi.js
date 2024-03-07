const router = require('express').Router();
const {User, SellersComment, Record, Seller} = require('../../db/models')

router.post('/comment', async (req, res) => {
  try {
    console.log(req.body);
    const {seller_id, comment} = req.body

    if(res.locals.user){
      // console.log(123123);
      const commentAdd = await SellersComment.create({seller_id:+seller_id, comment, user_id:res.locals.user.id})
      const commentUser = await SellersComment.findOne({include: {model : User}, where:{id:commentAdd.id}})
      res.json({commentUser})
    }
  


  } catch ({message}) {
    res.json({type: 'comment router', message})
  }
})


router.get('/comments/:id', async (req, res) => {
  try {
    const {id} = req.params
    const seller = await Seller.findOne({where: {user_id:+id}})
    const comments = await SellersComment.findAll({include: {model: User}, where:{seller_id:seller.id}})
    res.json(comments)
  } catch ({message}) {
    res.json({type: 'comment router', message})
  }
})

router.delete('/:comId', async(req, res) => {
  const {comId} = req.params
  console.log(comId, 'ID COMMENTA')
  const comment = await SellersComment.findOne({where: {id: comId}})
  try {
    if (res.locals.user.role === 'admin' || comment.user_id === res.locals.user.id) {
      const result = await SellersComment.destroy({ where: { id: comId } });
      if (result > 0) {
        res.json(+comId);
      }
    }
  } catch ({message}) {
    res.json(message)
    
  }
  })

module.exports = router;