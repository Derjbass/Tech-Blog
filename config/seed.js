const seed_router = require('express').Router();
const Blog = require('../models/Blog');

Blog.create({
    title: 'Test Blog',
    content: 'Test Content',
    user_id: 1
});
Blog.create({
    title: 'Test Blog',
    content: 'Test Content',
    user_id: 1
});
Blog.create({
    title: 'Test Blog',
    content: 'Test Content',
    user_id: 1
})