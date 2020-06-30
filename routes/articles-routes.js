const express = require('express');
const router = express.Router();

const articlesControllers = require('../controllers/articles-controllers');

router.get('/', articlesControllers.getArticlesByQuery);

router.get('/:id', articlesControllers.getArticleById);

router.post('/', articlesControllers.createArticle);

router.delete('/:id', (req, res, next)=>{
  res.json({id:`delete post ${req.body.id}`});
});

module.exports = router;
