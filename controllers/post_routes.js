const post_router = require('express').Router();
const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

post_router.post('/', (req, res) => {
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    res.redirect('/dashboard');
})

//update blog status to true to pull for update page
post_router.post('/update/:id', (req, res) => {
    console.log("Post router put called");
    Blog.update({
        update: req.body.update,
    },
    {
        where: {
            id: req.params.id,
        }
    }
    );
});

//update blog post contents
post_router.post('/update', (req, res) => {
    console.log("Blog updater route triggered");
    Blog.update({
        title: req.body.title,
        content: req.body.content,
        update: false
    },
    {
        where: {
            update: true
        }
    });
    res.redirect(303, '/dashboard');
})

//delete blog post
post_router.post('/delete', (req, res) => {
    console.log("Blog delete triggered");
    Blog.destroy({
        where: {
            update: true
        }
    });
    res.redirect('/dashboard');
})

//add comment to blog
post_router.get('/comment', (req, res) => {
    let blogToComment = Blog.findByPk(req.data.id)
    res.render('comment', { blogToComment })
})

module.exports = post_router;