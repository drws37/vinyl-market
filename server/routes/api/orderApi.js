const router = require('express').Router();
const {Order, OrderItem, Record} = require('../../db/models')


router.delete('/:id', async(req, res) => {
try {
  console.log(123123123);
  const {id} = req.params
  console.log(id, '123123 ');

  const orderDelete = await OrderItem.destroy({where: {record_id: id}})
  console.log(orderDelete, '123123123');
  if(orderDelete){
    console.log('-------------');
    res.json(id)

  }
  
} catch ({message}) {
  res.json(message)
  
}
})



router.post('/', async (req, res) => {
  try { 
    const {status, id} = req.body
    // console.log(req.body);

    if (res.locals.user){
        const orderCheck = await Order.findOne({where: {user_id:res.locals.user.id}})
        // console.log(orderCheck);
        if (orderCheck){
          const record = await Record.findOne({where: id})
          const orderItemCreate = await OrderItem.create({order_id:orderCheck.id, record_id: record.id, price: record.price, count: 1});
          console.log(orderItemCreate.count, record.id);
          res.json(orderItemCreate)
          
        }else{
          // console.log(123321213213213123231123123);
        const record = await Record.findOne({where: id})
        const orderCreate = await Order.create({status: 'Корзина', user_id: res.locals.user.id, total_price:1});

        const orderItemCreate = await OrderItem.create({order_id:orderCreate.id, record_id: record.id, price: record.price, count: 1});
        console.log(orderItemCreate, '12312312312312321');
   
        res.json(orderItemCreate)
        }

    }


  } catch ({message}) {
    res.json({type: 'order router', message})
  } 
})


router.get('/order', async (req,res) => {

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