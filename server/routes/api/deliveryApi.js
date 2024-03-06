const router = require('express').Router();
const {Delivery, Order, User, SellersComment, Record, Seller} = require('../../db/models')

router.post('/', async (req, res) => {
  try {
      const {first_name, middle_name, last_name, phone,data, adress,order_id} = req.body
      console.log(req.body);
      if(res.locals.user){
          console.log(123123123);
        const delivery = await Delivery.create({data,first_name, middle_name, last_name, adress, phone, status: 'Ожидание оплаты', order_id})
        res.json(delivery)
      }
  } catch ({message}) {
    res.json({type: 'delivery router', message})
  }
})


router.get('/:id', async (req, res) => {
  try {
      let order;
    order = await Order.findOne({include: [{model: Delivery}], where:{user_id:res.locals.user.id}})
    console.log(order.user_id);
    if(res.locals.user.id === order.user_id){
        res.json(order)
        return
    }
    console.log(order);
    res.json(order)
  } catch ({message}) {
    res.json({type: 'comment router', message})
  }
})


module.exports = router;