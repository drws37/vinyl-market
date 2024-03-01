const router = require('express').Router();
const {Category} = require('../../db/models')

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    console.log(categories, 'CATEGORIES');
    res.json({categories})
  } catch ({message}) {
    res.json({type: 'categories router', message})
  }
})

module.exports = router;