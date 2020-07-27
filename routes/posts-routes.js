const express = require('express');

const router = express.Router();
const postControllers = require('../controllers/post-controllers');

router.get('/', postControllers.getPostsByQuery );

router.get('/:id', (req, res, next)=>{
    res.json({"color":`${req.params.id}`})
});

router.post('/', postControllers.createPost );

router.patch('/:id', (req, res, next)=>{
    res.json({"color":"of your world"})
});

router.delete('/:id', (req, res, next)=>{
    res.json({"color":"of your world"})
});

module.exports = router;