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
    // console.log(records, 'RECORDSSSSS')
    res.json({ records });
  } catch ({ message }) {
    res.json({ type: 'records router', message });
  }
});

router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { title, artist, description, price, quality, category } = req.body;

    let newFileUrl = '';
    if (req.file) {
      newFileUrl = `/recordImg/${req.file.originalname}`;
    }

    const record = await Record.create({
      title,
      artist,
      description,
      price: +price,
      quality,
      img: newFileUrl || '/recordImg/vinyl.png',
      user_id: 1,
      category_id: +category,
    });
    await RecordPrice.create({
      price: record.price,
      record_id: record.id,
    });
    res.json({ record });
  } catch ({ message }) {
    res.json({ type: 'records router', message });
  }
});

router.put('/:recordId', upload.single('img'), async (req, res) => {
  try {
    const { recordId } = req.params;
    const { title, artist, description, price, quality } = req.body;

    let newFileUrl = null;
    if (req.file) {
      newFileUrl = `/recordImg/${req.file.originalname}`;
    }

    const record = await Record.findOne({ where: { id: recordId } });

    if (newFileUrl) {
      await record.update(
        { title, artist, description, price: +price, quality, img: newFileUrl },
        { where: { id: recordId } }
      );
    } else {
      await record.update(
        { title, artist, description, price: +price, quality },
        { where: { id: recordId } }
      );
    }

    const updatedRecord = await Record.findOne({ where: { id: recordId } });

    await RecordPrice.create({
      price: updatedRecord.price,
      record_id: updatedRecord.id,
    });

    res.json(updatedRecord);
  } catch ({ message }) {
    res.json({ type: 'records router', message });
  }
});

router.delete('/:recordId', async (req, res) => {
  try {
    const { recordId } = req.params;
    const result = await Record.destroy({ where: { id: recordId } });
    if (result > 0) {
      res.json(+recordId);
    }
  } catch ({ message }) {
    res.json({ type: 'records router', message });
  }
});

router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.findAll;
    res.json({ songs });
  } catch ({ message }) {
    res.json({ type: 'records router', message });
  }
});

router.post('/songs', async (req, res) => {});

module.exports = router;
