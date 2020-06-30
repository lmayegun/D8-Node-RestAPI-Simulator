const express = require('express');
const router = express.Router();

router.get('/news', (req, res, next)=>{
  res.send('news articles path :)');
});

router.get('/knowledge', (req, res, next)=>{
  res.send('knowledge articles path :)');
});

module.exports = router;
