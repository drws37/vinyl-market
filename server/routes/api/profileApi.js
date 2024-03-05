const router = require('express').Router();
const {User, Seller, Record} = require('../../db/models')

router.post('/:profileId', async (req, res) => {
console.log(req.body);
const { phone, addres, itn, user_id } = req.body

const user = await User.findOne({where: {id: user_id}})
const findSeller = await Seller.findOne({where: {user_id:user_id}})
if (user.role === 'seller' && !findSeller){
    const seller = await Seller.create({phone, adress:addres, itn, user_id:res.locals.user.id})
    res.json({message: 'ok'})
}else{
    res.json({message: 'ne ok'})

}
})

module.exports = router;