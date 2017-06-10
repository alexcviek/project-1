const router = require('express').Router();

const statics = require('../controllers/statics');
const auroras = require('../controllers/auroras');
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const secureRoute   = require('../lib/secureRoute');

router.route('/')
  .get(statics.index);

router.route('/dashboard')
  .get(secureRoute, statics.dashboard);

router.route('/auroras')
  .get(secureRoute, auroras.index)
  .post(secureRoute, auroras.create);

router.route('/auroras/new')
  .get(secureRoute, auroras.new);

router.route('/auroras/:id')
  .get(secureRoute, auroras.show)
  .put(secureRoute, auroras.update)
  .delete(secureRoute, auroras.delete);

router.route('/auroras/:id/edit')
  .get(secureRoute, auroras.edit);

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

module.exports = router;
