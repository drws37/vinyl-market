const router = require('express').Router();
const {Order, OrderItem, Record, Favorite} = require('../../db/models')





router.post('/:id', async (req, res) => {
  try { 
    const {id} = req.body
    console.log(id);
    // console.log(req.body);

    if (res.locals.user){
          const favoriteCreate = await Favorite.create({user_id:res.locals.user.id, record_id: id});
        //   console.log(favoriteCreate.id, record.id);
          res.json(favoriteCreate)
          
        }
} catch ({message}) {
    res.json({type: 'favorite router', message})
  } 
})

// router.delete('/:id', async(req, res) => {
//     try {
//       console.log(123123123);
//       const {id} = req.params
//       console.log(id, '123123 ');
    
//       const orderDelete = await OrderItem.destroy({where: {record_id: id}})
//       console.log(orderDelete, '123123123');
//       if(orderDelete){
//         console.log('-------------');
//         res.json(id)
    
//       }
      
//     } catch ({message}) {
//       res.json(message)
      
//     }
//     })


router.get('/', async (req,res) => {

  try {
    if(res.locals.user){
      const orders1 = await Order.findOne({where:{user_id:res.locals.user.id}})
      // console.log(orders1);
      const orders = await OrderItem.findAll({include:[{model: Record}], where: {order_id: orders1.id}})
      // console.log(orders);
    
      res.json(orders)
    }
    
  } catch ({message}) {
    res.json(message)
    
  }


})
module.exports = router;