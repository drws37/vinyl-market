const router = require('express').Router();
const { Order, OrderItem, Record } = require('../../db/models');

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const orderItem = await OrderItem.findOne({ where: { record_id: id } });

		const orderDelete = await OrderItem.destroy({ where: { record_id: id } });
		const order = await Order.findOne({ where: { id: orderItem.order_id } });
		const price = orderItem.price * orderItem.count;
		order.total_price -= price;
		order.save();
		res.json({ id, order });
	} catch ({ message }) {
		res.json(message);
	}
});

router.post('/', async (req, res) => {
	try {
		const { id } = req.body;
		if (res.locals.user) {
			const orderCheck = await Order.findOne({
				where: { user_id: res.locals.user.id, status: 'Корзина' },
			});
			if (orderCheck) {
				const record = await Record.findOne({ where: id });
				const orderItem = await OrderItem.findOne({
					where: { order_id: orderCheck.id, record_id: record.id },
				});
				let orderItemCreate;
				if (orderItem) {
					orderItemCreate = await OrderItem.update(
						{ count: orderItem.count + 1 },
						{ where: { id: orderItem.id } }
					);
				} else {
					orderItemCreate = await OrderItem.create({
						order_id: orderCheck.id,
						count: 1,
						record_id: id,
						price: record.price,
					});
				}
				orderCheck.total_price += record.price;
				orderCheck.save();
				res.json(orderItemCreate);
			} else {
				const record = await Record.findOne({ where: id });
				const orderCreate = await Order.create({
					status: 'Корзина',
					user_id: res.locals.user.id,
					total_price: record.price,
				});
				const orderItemCreate = await OrderItem.create({
					order_id: orderCreate.id,
					record_id: record.id,
					price: record.price,
					count: 1,
				});

				res.json(orderItemCreate);
			}
		}
	} catch ({ message }) {
		res.json({ type: 'order router', message });
	}
});

router.get('/order', async (req, res) => {
	try {
		if (res.locals.user) {
			const orders1 = await Order.findOne({
				where: { user_id: res.locals.user.id, status: 'Корзина' },
			});

			if (orders1) {
				const orders = await OrderItem.findAll({
					include: [{ model: Record }, { model: Order }],
					where: { order_id: orders1.id },
				});
				res.json({ orders, message: 'ok' });
			} else {
				res.json({ message: 'clear' });
			}
		}
	} catch ({ message }) {
		res.json(message);
	}
});
module.exports = router;
