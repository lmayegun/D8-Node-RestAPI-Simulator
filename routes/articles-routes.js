const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/file-upload');

const articlesControllers = require('../controllers/articles-controllers');

router.get('/', articlesControllers.getArticlesByQuery);

router.get('/:id', articlesControllers.getArticleById);

router.post('/',
            fileUpload.single('image'),
            articlesControllers.createArticle);

router.patch('/:id', articlesControllers.updateArticle);

router.delete('/:id', articlesControllers.deleteArticle);

module.exports = router;
