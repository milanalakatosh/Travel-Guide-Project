const { ExcurComment, User } = require('../db/models');

exports.postAddComment = async (req, res) => {
  const { text, excursionId, userId } = req.body;
  const user = await User.findOne({ where: { id: userId } });
  const userName = user.name;
  const comment = await ExcurComment.create({ text, excursion_id: excursionId, user_id: userId });
  const newComment = {
    ...comment.dataValues,
    name: userName,
    createdAt: `${String(comment.dataValues.createdAt.getFullYear())}-${String(comment.dataValues.createdAt.getMonth() + 1)}-${String(comment.dataValues.createdAt.getUTCDate())}`,
  };

  res.json(newComment);
};

exports.getAllComments = async (req, res) => {
  const allComments = await ExcurComment.findAll({
    order: [['id', 'ASC']],
    where: { excursion_id: req.params.id },
    include: { model: User },
    raw: true,
  });
  const newAllComments = [];

  for (let i = 0; i < allComments.length; i += 1) {
    const obj = {
      id: allComments[i].id,
      excursion_id: allComments[i].excursion_id,
      user_id: allComments[i].user_id,
      text: allComments[i].text,
      name: allComments[i]['User.name'],
      createdAt: `${String(allComments[i].createdAt.getFullYear())}-${String(allComments[i].createdAt.getMonth() + 1)}-${String(allComments[i].createdAt.getUTCDate())}`,
    };
    newAllComments.push(obj);
  }

  res.json(newAllComments);
};

exports.deleteComments = async (req, res) => {
  await ExcurComment.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
};

exports.updateComments = async (req, res) => {
  await ExcurComment.update({ text: req.body.value }, { where: { id: req.params.id } });
  res.sendStatus(200);
};
