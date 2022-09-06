const router = require('express').Router();
const {
  getAllExcursions, getOnExcursion, delOneExcursion, updateExcPage,
} = require('../controllers/excursionControl');

router.get('/', getAllExcursions);
router.get('/:id', getOnExcursion);
router.delete('/:id', delOneExcursion);
router.put('/updexc/:id', updateExcPage);

module.exports = router;
