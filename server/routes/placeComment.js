const router = require('express').Router();
const {
  postAddCommentPlace, getAllCommentsPlace, deleteCommentsPlace, updateCommentsPlace,
} = require('../controllers/placeCommentControl');

router.post('/add', postAddCommentPlace);
router.get('/:id', getAllCommentsPlace);
router.delete('/:id', deleteCommentsPlace);
router.put('/comment/:id', updateCommentsPlace);

module.exports = router;
