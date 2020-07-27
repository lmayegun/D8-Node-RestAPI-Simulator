const express = require('express');

const router = express.Router();
const postControllers = require('../controllers/post-controllers');

router.get('/', postControllers.getPostsByQuery );

router.get('/:id', postControllers.getPostById );

router.post('/', postControllers.createPost );

router.patch('/:id', postControllers.updatePost );

router.delete('/:id', postControllers.deletePost );

module.exports = router;