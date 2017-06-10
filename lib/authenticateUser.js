const User = require('../models/user');

function authenticateUser (req, res, next) {
  if(!req.session.userId) return next();

  User
  .findById(req.session.userId)
  .then((user) =>{
    if(!user){
      return req.session.regenerate(() => res.redirect('/'));
    }
    res.locals.user = user;
    res.locals.isLoggedIn = true;
    req.session.userId = user.id;

    next();
  });
}

module.exports = authenticateUser;
