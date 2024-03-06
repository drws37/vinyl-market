const router = require('express').Router();
const { Record, Favorite } = require('../../db/models');

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    // console.log(req.body);

    if (res.locals.user) {
      const favoriteCreate = await Favorite.create({
        user_id: res.locals.user.id,
        record_id: id,
      });
      const favorite = await Favorite.findOne({
        include: { model: Record },
        where: { id: favoriteCreate.id },
      });
      res.json(favorite);
    }
  } catch ({ message }) {
    res.json({ type: 'favorite router', message });
  }
});

router.delete('/item/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const orderDelete = await Favorite.destroy({ where: { record_id: id } });
    console.log(orderDelete, '123123123');
    if (orderDelete) {
      res.json(+id);
    }
  } catch ({ message }) {
    res.json(message);
  }
});

router.get('/', async (req, res) => {
  try {
    if (res.locals.user) {
      const favorite = await Favorite.findAll({
        include: [{ model: Record }],
        where: { user_id: res.locals.user.id },
      });
      console.log(favorite)
      res.json(favorite);
    }
  } catch ({ message }) {
    res.json(message);
  }
});
module.exports = router;
