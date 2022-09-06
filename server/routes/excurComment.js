const router = require('express').Router();
const {
  postAddComment, getAllComments, deleteComments, updateComments,
} = require('../controllers/excurCommentControl');

router.post('/add', postAddComment);
router.get('/:id', getAllComments);
router.put('/comment/:id', updateComments);
router.delete('/:id', deleteComments);

module.exports = router;
