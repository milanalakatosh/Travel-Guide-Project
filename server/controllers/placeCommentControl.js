const { PlaceComment, User } = require('../db/models');

exports.postAddCommentPlace = async (req, res) => {
  const { text, postId, userId } = req.body;
  const user = await User.findOne({ where: { id: userId } });
  const userName = user.name;
  const comment = await PlaceComment.create({ text, place_id: postId, user_id: userId });
  const newComment = {
    ...comment.dataValues,
    name: userName,
    createdAt: `${String(comment.dataValues.createdAt.getFullYear())}-${String(comment.dataValues.createdAt.getMonth() + 1)}-${String(comment.dataValues.createdAt.getUTCDate())}`,
  };
  res.json(newComment);
};

exports.getAllCommentsPlace = async (req, res) => {
  const allComments = await PlaceComment.findAll({
    order: [['id', 'ASC']],
    where: { place_id: req.params.id },
    include: { model: User },
    raw: true,
  });
  const newAllComments = [];

  for (let i = 0; i < allComments.length; i += 1) {
    const obj = {
      id: allComments[i].id,
      place_id: allComments[i].place_id,
      user_id: allComments[i].user_id,
      text: allComments[i].text,
      name: allComments[i]['User.name'],
      createdAt: `${String(allComments[i].createdAt.getFullYear())}-${String(allComments[i].createdAt.getMonth() + 1)}-${String(allComments[i].createdAt.getUTCDate())}`,
    };
    newAllComments.push(obj);
  }
  res.json(newAllComments);
};

exports.deleteCommentsPlace = async (req, res) => {
  await PlaceComment.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
};

exports.updateCommentsPlace = async (req, res) => {
  await PlaceComment.update({ text: req.body.value }, { where: { id: req.params.id } });
  res.sendStatus(200);
};
