const express = require('express');
const { check } = require('express-validator')

const router = express.Router();
const videoControllers = require('../controllers/video-controllers');

router.get('/', videoControllers.getVideosByQuery );

router.get('/:id', videoControllers.getVideoById );

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
            videoControllers.createVideo 
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
            videoControllers.updateVideo 
        );

router.delete('/:id', videoControllers.deleteVideo );

module.exports = router;