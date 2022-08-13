const post_router = require('express').Router();
const User = require('../models/User');
const Blog = require('../models/Blog');

post_router.post('/', (req, res) => {
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    res.redirect('/dashboard');
})

module.exports = post_router;