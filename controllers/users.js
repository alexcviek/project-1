const User = require('../models/user');

function userShow (req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('users/show', { user });
    })
    .catch(next);

}

function userEdit(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('users/edit', { user });
    })
    .catch(next);
}

function userUpdate(req, res, next) {
  if(req.file) req.body.image = req.file.key;

  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function userDelete(req, res, next) {
  req.user
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('/', 'Your account has been deleted'));
    })
    .catch(next);
}

module.exports = {
  show: userShow,
  edit: userEdit,
  update: userUpdate,
  delete: userDelete
};
