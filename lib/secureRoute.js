function secureRoute(req, res, next){
  if(!req.session.userId){
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/');
    });
  }
  next();
}

module.exports = secureRoute;
