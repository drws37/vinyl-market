const router = require('express').Router();
const {Record, Song} = require('../../db/models')

router.get('/', async (req, res) => {
  try {
    const records = await Record.findAll({include: [{
      model: Song,
    }]});
    res.json({records})
  } catch ({message}) {
    res.json({type: 'records router', message})
  }
})

module.exports = router;