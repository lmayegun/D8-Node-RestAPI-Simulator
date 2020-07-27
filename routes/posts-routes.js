const express = require('express');

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.json({"color":"of your world"})
});

router.get('/:id', (req, res, next)=>{
    res.json({"color":`${req.params.id}`})
});

router.post('/', (req, res, next)=>{
    res.json({"color":"of your world"})
});

router.patch('/:id', (req, res, next)=>{
    res.json({"color":"of your world"})
});

router.delete('/:id', (req, res, next)=>{
    res.json({"color":"of your world"})
});



module.exports = router;