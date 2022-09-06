const router = require('express').Router();
const {
  mapControll,
  addMapControll,
} = require('../controllers/yandexMapControl');

router.get('/', mapControll);
router.post('/add', addMapControll);

module.exports = router;
