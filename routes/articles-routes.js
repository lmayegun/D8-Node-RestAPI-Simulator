const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const fileUpload = require('../middleware/file-upload');

const articlesControllers = require('../controllers/articles-controllers');

router.get('/', articlesControllers.getArticlesByQuery);

router.get('/:id', articlesControllers.getArticleById);

router.post('/',
            fileUpload.single('image'),
            [
              check('title')
                .not()
                .isEmpty(),
              check('category')
                .not()
                .isEmpty(),
            ],
            articlesControllers.createArticle
          );

router.patch('/:id',
             fileUpload.single('image'),
             [
              check('title')
                .not()
                .isEmpty(),
              check('category')
                .not()
                .isEmpty(),
             ],
             articlesControllers.updateArticle
           );

router.delete('/:id', articlesControllers.deleteArticle);

module.exports = router;
