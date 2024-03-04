const router = require('express').Router();
const {Order, OrderItem, Record, Favorite} = require('../../db/models')





router.post('/:id', async (req, res) => {
  try { 
    const {id} = req.body
    console.log(id);
    // console.log(req.body);

    if (res.locals.user){
          const favoriteCreate = await Favorite.create({user_id:res.locals.user.id, record_id: id});
          const favorite = await Favorite.findOne({include:{model: Record}, where:{id: favoriteCreate.id}})
          res.json(favorite)
          
        }
} catch ({message}) {
    res.json({type: 'favorite router', message})
  } 
})

router.delete('/item/:id', async(req, res) => {
    try {
      // console.log(123123123);
      const {id} = req.params
      // console.log(id, '123123 ');
    
      const orderDelete = await Favorite.destroy({where: {record_id: id}})
      console.log(orderDelete, '123123123');
      if(orderDelete){
        // console.log('-------------');
        res.json(+id)
    
      }
      
    } catch ({message}) {
      res.json(message)
      
    }
    })


router.get('/', async (req,res) => {

  try {
    if(res.locals.user){
      const favorite = await Favorite.findAll({include:[{model: Record}], where: {user_id: res.locals.user.id}})
      res.json(favorite)
    }
    
  } catch ({message}) {
    res.json(message)
    
  }


})
module.exports = router;