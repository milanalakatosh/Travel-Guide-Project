const router = require('express').Router();
const {
  getAllPosts, getOnePost, delOnePost, updatePostPage,
} = require('../controllers/postControl');

router.get('/', getAllPosts);
router.get('/:id', getOnePost);
router.delete('/:id', delOnePost);
router.put('/updpost/:id', updatePostPage);

module.exports = router;
