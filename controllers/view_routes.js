// Create a router object to set up routes
const view_router = require('express').Router();
const { isLoggedIn } = require('./helpers');
const User = require('../models/User');
const Blog = require('../models/Blog');

// GET route listening on localhost:3333/ - Root Route
// We pass in our custom middleware function to redirect them back to index
// if they try to access an auth route(login/register)
view_router.get('/', isLoggedIn, async (req, res) => {
  // Pull the user id from the session object
  const user_id = req.session.user_id;

  //find all blogs and all users associated with blog
  let allUsers = await User.findAll({
    include: Blog,
  });
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
        res.render('index', { user, allUsers });
      });
  }
  res.render('index', { allUsers });

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

view_router.get('/dashboard', isLoggedIn, async (req, res) => {
  let currentBlogs = await User.findOne({
    where: {
      id: req.session.user_id
    },
    include: Blog
  })
  console.log(currentBlogs);

  let user = await getUser(req.session.user_id);
  //render user and blogs
  res.render('dashboard', { currentBlogs, user });
});

view_router.get('/new_post', isLoggedIn, async (req, res) => {
  let user = await getUser(req.session.user_id);
  res.render('new_post', { user });
})

view_router.get('/update', async (req, res) => {
  let blogToUpdate = await Blog.findOne(
    {
      where: {
        update: true,
      }
    }
  );
  res.render('update', { blogToUpdate } );
});

view_router.get('/update/:id', isLoggedIn, async (req, res) => {
  let getBlog = await Blog.findByPk(req.params.id);
  res.send(getBlog);
})


//function to get user without having to type it out multiple times
async function getUser(id){
  let currentUser = await User.findOne({
    where: {
      id: id
    }
  })
  return currentUser;
}

module.exports = view_router;