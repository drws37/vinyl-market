const router = require('express').Router();
const { Record, Song, RecordPrice } = require('../../db/models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/recordImg');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const records = await Record.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: Song,
        },
        {
          model: RecordPrice,
        },
      ],
    });
    console.log(records, 'RECORDSSSSS')
    res.json({ records });
  } catch ({ message }) {
    res.json({ type: 'records router', message });
  }
});

router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { title, artist, description, price, quality } = req.body;
    const newFileUrl = `/recordImg/${req.file.originalname}`;
    const record = await Record.create({
      title,
      artist,
      description,
      price: +price,
      quality,
      img: newFileUrl,
      user_id: 1,
      category_id: 1,
    });
    res.json({ record });
  } catch ({ message }) {
    res.json({ type: 'records router', message });
  }
});

router.put('/:recordId', upload.single('img'), async (req, res) => {
  try {
    console.log(req.body);
    const { recordId } = req.params;
    const { title, artist, description, price, quality } = req.body;
    const newFileUrl = `/recordImg/${req.file.originalname}`;
    const record = await Record.findOne({ where: { id: recordId } });
    const result = await record.update(
      { title, artist, description, price: +price, quality, img: newFileUrl },
      { where: { id: recordId } }
    );
    res.json(result);
  } catch ({ message }) {
    res.json({ type: 'records router', message });
  }
});

module.exports = router;
