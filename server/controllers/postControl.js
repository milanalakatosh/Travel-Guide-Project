const { Place, PlaceComment } = require('../db/models');

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Place.findAll({ order: [['id', 'ASC']], raw: true });
    console.log('allPosts: ', allPosts);
    res.json(allPosts);
  } catch (err) {
    console.log(err);
  }
};

exports.getOnePost = async (req, res) => {
  const post = await Place.findByPk(req.params.id);
  setTimeout(() => { res.json(post); }, 1000);
};

exports.delOnePost = async (req, res) => {
  await PlaceComment.destroy({ where: { place_id: req.params.id } });
  await Place.destroy({ where: { id: req.params.id } });

  res.sendStatus(200);
};

exports.updatePostPage = async (req, res) => {
  await Place.update({
    text: req.body.text,
    title: req.body.title,
  }, { where: { id: req.params.id } });
  const newPost = await Place.findOne({ where: { id: req.params.id } });
  res.json(newPost);
};
