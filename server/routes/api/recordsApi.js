const router = require('express').Router();
const { Record, Song, RecordPrice, User } = require('../../db/models');
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
      status: false,
      user_id: res.locals.user.id,
      category_id: +category,
    });

    await RecordPrice.create({
      price: record.price,
      record_id: record.id,
    });
    const currentRecord = await Record.findOne({
      where: {
        id: record.id,
      },
      include: [{ model: RecordPrice }, { model: Song }],
    });
    res.json({ record: currentRecord });
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

    const record = await Record.findOne({ where: { id: recordId, user_id: res.locals.user.id} });

    if (newFileUrl) {
      await record.update(
        { title, artist, description, price: +price, quality, img: newFileUrl },
        { where: { id: recordId, user_id: res.locals.user.id } }
      );
    } else {
      await record.update(
        { title, artist, description, price: +price, quality },
        { where: { id: recordId, user_id: res.locals.user.id } }
      );
    }

    const findedPrice = await RecordPrice.findOne({
      where: {
        price: record.price,
      },
      order: [['createdAt', 'DESC']],
    });
    console.log(findedPrice);

    if (!findedPrice) {
      await RecordPrice.create({
        price: record.price,
        record_id: record.id,
      });
    }

    const currentRecord = await Record.findOne({
      where: {
        id: record.id,
      },
      include: [{ model: RecordPrice }, { model: Song }],
    });

    res.json(currentRecord);
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
    const songs = await Song.findAll();
    res.json({ songs });
  } catch ({ message }) {
    res.json({ type: 'records router', message });
  }
});

router.post('/songs', async (req, res) => {
  const { songs } = req.body;
  try {
    const songsArray = await Promise.all(
      songs.map(async (songData) => {
        const { songTitle, duration, record_id } = songData;
        return await Song.create({ songTitle, duration, record_id });
      })
    );
    res.json(songsArray);
  } catch ({ message }) {
    res.json({ type: 'records router', message });
  }
});

module.exports = router;
