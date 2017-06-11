const router = require('express').Router();

const statics = require('../controllers/statics');
const auroras = require('../controllers/auroras');
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const users = require('../controllers/users');
const secureRoute   = require('../lib/secureRoute');
const upload = require('../lib/upload');

router.route('/')
  .get(statics.index);

router.route('/dashboard')
  .get(secureRoute, statics.dashboard);

router.route('/auroras')
  .get(secureRoute, auroras.index)
  .post(secureRoute, upload.single('image'), auroras.create);

router.route('/auroras/new')
  .get(secureRoute, auroras.new);

router.route('/auroras/:id')
  .get(secureRoute, auroras.show)
  .put(secureRoute, auroras.update)
  .delete(secureRoute, auroras.delete);

router.route('/auroras/:id/edit')
  .get(secureRoute, auroras.edit);

router.route('/users/:id')
  .get(secureRoute, users.show)
  .post(upload.single('image'), users.update)
  .delete(secureRoute, users.delete);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/auroras/:id/comments')
  .post(secureRoute, auroras.createComment);

router.route('/auroras/:id/comments/:commentId')
  .delete(secureRoute, auroras.deleteComment);

router.all('*', (req, res) => res.notFound());

module.exports = router;
