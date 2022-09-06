const { Excursion, ExcurComment } = require('../db/models');

exports.getAllExcursions = async (req, res) => {
  const allExcursions = await Excursion.findAll({ order: [['id', 'ASC']], raw: true });
  res.json(allExcursions);
};

exports.getOnExcursion = async (req, res) => {
  const onExcursion = await Excursion.findByPk(req.params.id);
  res.json(onExcursion);
};

exports.delOneExcursion = async (req, res) => {
  await ExcurComment.destroy({ where: { excursion_id: req.params.id } });
  await Excursion.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
};

exports.updateExcPage = async (req, res) => {
  console.log(req.body, 11111);
  await Excursion.update({
    text: req.body.text,
    title: req.body.title,
  }, { where: { id: req.params.id } });
  const newExcursion = await Excursion.findOne({ where: { id: req.params.id } });
  res.json(newExcursion);
};
