const router = require('express').Router();
const { Category, Record } = require('../../db/models');

router.get('/', async (req, res) => {
	try {
		const categories = await Category.findAll({ include: Record });
		res.json({ categories });
	} catch ({ message }) {
		res.json({ type: 'categories router', message });
	}
});

module.exports = router;
