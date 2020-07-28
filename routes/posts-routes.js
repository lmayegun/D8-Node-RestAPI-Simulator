const express = require('express');
const { check } = require('express-validator')

const router = express.Router();
const postControllers = require('../controllers/post-controllers');

router.get('/', postControllers.getPostsByQuery );

router.get('/:id', postControllers.getPostById );

router.post(
            '/', 
            [
            check('title')
            .not()
            .isEmpty(),
            check('category')
            .not()
            .isEmpty(),
            ],
            postControllers.createPost 
        );

router.patch(
            '/:id', 
            [
            check('title')
            .not()
            .isEmpty(),
            check('category')
            .not()
            .isEmpty(),
            ],
            postControllers.updatePost 
        );

router.delete('/:id', postControllers.deletePost );

module.exports = router;