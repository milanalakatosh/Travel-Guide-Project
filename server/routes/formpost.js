/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
const router = require('express').Router();
// миделвар добавления картинок
const multer = require('multer');
const { Place, PlaceLike } = require('../db/models');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}--${file.originalname}`);
  },
});
const upload = multer({ storage: fileStorageEngine });

router.post('/add', upload.single('image'), async (req, res) => {
  console.log('req.body;===============>', req.body);
  const {
    title, text, url, likes, userId,
  } = req.body;
  try {
    const post = await Place.create({
      title, text, url, img: req.file.filename, likes, user_id: userId,
    });
    res.json(post);
  } catch (err) {
    console.log(err);
    res.end();
  }
});

router.post('/like/plus/:id', async (req, res) => {
  try {
    await PlaceLike.create({ user_id: req.body.id, place_id: req.params.id });
    const place = await Place.findOne({ where: { id: req.params.id } });
    const newCount = place.likes + 1;
    await Place.update(
      { likes: newCount },
      { where: { id: req.params.id } },
    );
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.end();
  }
});

router.post('/like/minus/:id', async (req, res) => {
  try {
    await PlaceLike.destroy({ where: { user_id: req.body.id, place_id: req.params.id } });
    const place = await Place.findOne({ where: { id: req.params.id } });
    const newCount = place.likes - 1;
    await Place.update(
      { likes: newCount },
      { where: { id: req.params.id } },
    );
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.end();
  }
});

router.post('/like/check/:id', async (req, res) => {
  console.log('req', req.params.id);
  const liked = await PlaceLike.findOne({
    where:
			{ place_id: req.params.id, user_id: req.body.id },
  });
  if (liked) {
    res.status(200).end();
  }
  res.status(201).end();
});

module.exports = router;
