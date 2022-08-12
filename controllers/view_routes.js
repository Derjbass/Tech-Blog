// Create a router object to set up routes
const view_router = require('express').Router();
const { isLoggedIn } = require('./helpers');
const User = require('../models/User');
const Blog = require('../models/Blog');

// GET route listening on localhost:3333/ - Root Route
// We pass in our custom middleware function to redirect them back to index
// if they try to access an auth route(login/register)
view_router.get('/', isLoggedIn, (req, res) => {
  // Pull the user id from the session object
  const user_id = req.session.user_id;

  // If there is a user id stored, we can use that to look up the user by id
  if (user_id) {
    // Using "return" stops the other code outside of the if block from running - this
    // helps to avoid using an else statement
    return User.findOne({
      where: {
        id: user_id
      },
      // Only retrieve the id and username fields from the database
      attributes: ['id', 'username']
    })
      .then(user => {
        // Create a new object to avoid the handlebars/sequelize error with rendered
        // username data
        user = {
          username: user.username
        };
        // Render the handlebars index view and attach the user object
        res.render('index', { user });
      });
  }

  // Sends our our index.hbs file back to the client-side - main.hbs is loaded first
  // then anything inside of index.hbs is outputted through the {{{body}}}
  res.render('index');
});

view_router.get('/login', isLoggedIn, (req, res) => {
  // Since we're attaching the errors array to the session when an error occurs, 
  // we just send that through every time a user visits /login or /register
  res.render('login', { errors: req.session.errors });
});

view_router.get('/register', isLoggedIn, (req, res) => {
  res.render('register', { errors: req.session.errors });
});

view_router.get('/dashboard', async (req, res) => {
  //find all blogs and all users associated with blog
  let allUsers = await User.findAll({
    include: Blog,
  });

  // let allUsers = await Blog.findAll({
  //   include: ['user'],
  // });
  console.log(allUsers);

  // allUsers = allUsers.map(userObj => userObj.toObject())
  // console.log(allUsers);

  // const allUsers = await User.findAll();
  // console.log(allBlogs);
  // console.log(allUsers);
  //length check
  // let len;
  // if(allBlogs.length > allUsers.length) {
  //   len = allBlogs.length;
  // }else {
  //   len = allUsers.length
  // }
  // for(let i = 0; i < len; i++){
    
  // }
  // allUsers = [...allUsers];

  // allUsers = allUsers.map(userObj => {
  //   userObj.blogs = [...userObj.blogs];
  //   return userObj;
  // })
  
  res.render('dashboard', { allUsers });
    
  
});

view_router.get('/new_post', (req, res) => {
  res.render('new_post');
})

module.exports = view_router;