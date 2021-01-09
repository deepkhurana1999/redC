const authorization = require('../middleware/auth.js');
const { Comment, validate } = require('../models/comment.js');
const express = require('express');
const router = express.Router();

router.get('/',async (req, res)=> {
    const comments = await Comment.find().sort("timestamp");
    res.send(comments);
});

router.post('/', authorization, async (req, res)=> {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let newComment = new Comment(req.body.content,req.body.title);

    res.send(newComment);
});

module.exports = router;