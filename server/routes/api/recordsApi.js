const router = require('express').Router();
const { log } = require('console');
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
		const { title, artist, description, price, quality, category, spotify } =
			req.body;

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
			spotifyId: spotify,
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

		const record = await Record.findOne({
			where: { id: recordId, user_id: res.locals.user.id },
		});

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
		const filtredArray = songs.filter(
			(song) => song.user_id === res.locals.user.id
		);
		const songsArray = await Promise.all(
			filtredArray.map(async (songData) => {
				const { songTitle, duration, record_id, user_id } = songData;
				return await Song.create({ songTitle, duration, record_id, user_id });
			})
		);
		res.json(songsArray);
	} catch ({ message }) {
		res.json({ type: 'records router', message });
	}
});

router.put('/:recordId/update', async (req, res) => {
	const { recordId } = req.params;

	const { status } = req.body;

	try {
		const record = await Record.findOne({ where: { id: recordId } });
		const result = await record.update({ status: status });
		res.json(+recordId);
	} catch ({ message }) {
		res.json({ type: 'records router', message });
	}
});

router.delete('/:songId/songs', async (req, res) => {
	const { songId } = req.params;
	const song = await Song.findOne({ where: { id: songId } });
	try {
		if (
			song.user_id === res.locals.user.id ||
			res.locals.user.role === 'admin'
		) {
			const result = await Song.destroy({ where: { id: songId } });
			if (result > 0) {
				res.json(+songId);
			}
		}
	} catch ({ message }) {
		res.json({ type: 'recordds router', message });
	}
});

module.exports = router;
