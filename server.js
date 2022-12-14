const express = require('express');
const path = require('path');
// Grab the engine function from the handlebars package object
const { engine } = require('express-handlebars');
const PORT = process.env.PORT || 3333;
// Pull in our sequelize connection object
const db = require('./config/db_connection');
// Package that allows us to attach sessions to the server - temp storage
const session = require('express-session');
// Allows us to store our session data to the database instead of using system memory
// This is extremely important for any app that will have many users logging in/out
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// attach .env to process object
require('dotenv').config();
// Pull in our view routes and auth_route objects from the index file
const { view_routes, auth_routes } = require('./controllers');
const post_routes = require('./controllers/post_routes')

// Create our express app object to set up our server
const app = express();

// Set our view engine up as handlebars and use the shortname extension
app.engine('hbs', engine({ 
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}));
app.set('view engine', 'hbs');
// Share our front end files with the client-side(browser/insomnia/etc.)
app.use(express.static(path.join('front')));
// Allow json to be sent through from the client-side(browser) - req.body
app.use(express.json());
// Allow form data to be sent through and also allow object/array data - req.body
app.use(express.urlencoded({ extended: false }));

// Add session middleware to the server - gives us access to req.session on our routes
app.use(session({
  // This secret string will be compared to the client-side cookie to "authenticate" a user
  secret: process.env.SESSION_SECRET,
  // Stores our session data to the database instead of using server system memory
  // We pass our Sequelize connection object into the constructor, so it can connect with our database and sync
  // This will create a Sessions table on your database for storing the session information
  store: new SequelizeStore({ db }),
  // If we don't affect/change the session data during a request, this option
  // will allow the the store to "forget" the session at the end of a request
  saveUninitialized: false,
  // Keeps the sequelize store from deleting idle session data
  resave: false,
  // The cookie object allows us to manipulate the client-side cookie - set expiration,
  // set to httpOnly(is not accessible to client JS), etc.
  cookie: {
    // httpOnly: true
  }
}));

// Load our view routes at the root route - localhost:3333/
app.use('/', view_routes);
// Load our auth routes and prefix all those routes with /auth
app.use('/auth', auth_routes);
// load post routes
app.use('/new_post', post_routes);


// Sync our database tables - {force: true} to drop all tables and re-sync
db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});