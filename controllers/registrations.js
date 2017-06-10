const User = require('../models/user');

function registrationsNew(req, res){
  return res.render('registrations/new');
}

function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
