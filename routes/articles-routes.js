const express = require('express');
const router = express.Router();

const articlesControllers = require('../controllers/articles-controllers');

router.get('/', articlesControllers.getArticlesByQuery);

router.get('/:id', articlesControllers.getArticleById);

router.post('/', articlesControllers.createArticle);

router.patch('/:id', articlesControllers.updateArticle);

router.delete('/:id', articlesControllers.deleteArticle);

module.exports = router;
