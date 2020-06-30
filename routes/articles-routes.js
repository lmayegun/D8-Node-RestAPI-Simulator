const express = require('express');
const router = express.Router();

router.get('/:id', (req, res, next)=>{
  res.json({message:'news articles path :)'});
});

router.get('/:cat', (req, res, next)=>{
  res.json('news articles path :)');
});

router.post('/', (req, res, next)=>{
  res.json('post an article');
});

router.delete('/:id', (req, res, next)=>{
  res.json({id:`delete post ${req.body.id}`});
});

module.exports = router;
