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

//delete blog post
post_router.post('/delete/:id', (req, res) => {
    console.log("Blog delete triggered");
    Blog.destroy({
            where: {
                id: req.params.id,
            }
        }).then(() => {
        res.redirect('/dashboard');
    })
});


//add comment to blog post
post_router.post('/comment', (req, res) => {
    Blog.findByPk(req.body.blog_id)
        .then(blog => {
            blog.createComment({
                content: req.body.content,
                userId: req.session.user_id,
            }).then(() => {
                res.redirect('/');
            })
        });
    // Comment.create({
    //     content: req.body.content,
    //     userId: req.session.user_id,
    //     blog_id: req.body.blog_id
    // })
    // res.redirect('/');
})

module.exports = post_router;