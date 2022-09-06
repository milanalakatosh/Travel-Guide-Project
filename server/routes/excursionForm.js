const router = require('express').Router();
const multer = require('multer');
const { Excursion, ExcursionLike } = require('../db/models');

// папка и название для картинки
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}--${file.originalname}`);
  },
});

const upload = multer({ storage: fileStorageEngine });

// добавление экскурсии
router.post('/add', upload.single('image'), async (req, res) => {
  const {
    title, text, location, price, likes, userId,
  } = req.body;

  try {
    const excursion = await Excursion.create({
      title, text, count: 1, img: req.file.filename, location, price, likes, user_id: userId,
    });
    res.json(excursion);
  } catch (err) {
    console.log(err);
    res.end();
  }
});

router.post('/like/plus/:id', async (req, res) => {
  try {
  	await ExcursionLike.create({ user_id: req.body.id, excursion_id: req.params.id });
    const excursion = await Excursion.findOne({ where: { id: req.params.id } });
    const newCount = excursion.likes + 1;
    await Excursion.update(
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
    await ExcursionLike.destroy({ where: { user_id: req.body.id, excursion_id: req.params.id } });
    const excursion = await Excursion.findOne({ where: { id: req.params.id } });
    const newCount = excursion.likes - 1;
    await Excursion.update(
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
  const liked = await ExcursionLike.findOne({
    where:
		{ excursion_id: req.params.id, user_id: req.body.id },
  });
  if (liked) {
    res.status(200).end();
  }
  res.status(201).end();
});
module.exports = router;
