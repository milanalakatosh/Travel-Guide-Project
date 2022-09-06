const { Map } = require('../db/models');

exports.mapControll = async (req, res) => {
  const allPlacemark = await Map.findAll({ raw: true });
  res.json(allPlacemark);
};

exports.addMapControll = async (req, res) => {
  console.log('хээээээээээй');
  const {
    coordinates, text, content, link, postId,
  } = req.body;
  console.log('req.body', req.body);
  const newPlacemark = await Map.create({
    coordinates, text, content, link, post_id: postId,
  });
  console.log('newPlacemark: ', newPlacemark);

  res.status(200).json(newPlacemark);
};
