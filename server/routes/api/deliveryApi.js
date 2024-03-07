const router = require('express').Router();
const {Delivery, Order, User, SellersComment, Record, Seller, OrderItem} = require('../../db/models')

router.post('/', async (req, res) => {
  try {
      const {first_name, middle_name, last_name, phone,data, adress,order_id} = req.body
      console.log(req.body);
      if(res.locals.user){
          console.log(123123123);
        const delivery = await Delivery.create({data,first_name, middle_name, last_name, adress, phone, status: 'Оплачено', order_id})
        const updateOrder = Order.update({status:'Оплачено'}, {where:{id:delivery.order_id}})
        res.json(delivery)
      }
  } catch ({message}) {
    res.json({type: 'delivery router', message})
  }
})


router.get('/:id', async (req, res) => {
  try {
      let order;
    order = await Order.findAll({include: [{model: Delivery},{model:OrderItem,include:{model:Record}}], where:{user_id:res.locals.user.id,status:'Оплачено'}})

    res.json(order)
  } catch ({message}) {
    res.json({type: 'comment router', message})
  }
})


module.exports = router;