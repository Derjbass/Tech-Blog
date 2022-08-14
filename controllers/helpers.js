// Custom middleware function to check if a user is already logged in
exports.isLoggedIn = function (req, res, next) {
  // Grab the stored user id from the session object
  const user_id = req.session.user_id;
  // Check the route they visited and determine if they visited an
  // auth route
  const is_auth_route = req.path.match(/register|login/gi);
  // dashboard
  const is_dash = req.path.match(/dashboard|update/gi);

  // If they visited an auth route and are still logged in, we redirect them
  // back to the homepage/index view
  if (is_auth_route && user_id) {
    return res.redirect('/');
  }
  //redirect to login if user goes to dashboard link while not logged in
  else if (is_dash && !user_id){
    return res.redirect('/login');
  }

  // If they're not logged in, we allow them to proceed to 
  // the auth view(login/register)
  next();
}
