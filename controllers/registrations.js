const User = require('../models/user');

function registrationsNew(req, res){
  return res.render('registrations/new');
}

function registrationsCreate(req, res, next) {

  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);
    });
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
