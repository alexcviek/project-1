const router = require('express').Router();

const statics = require('../controllers/statics');
const auroras = require('../controllers/auroras');
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const geonames = require('../controllers/geonames');
const users = require('../controllers/users');
const forecasts = require('../controllers/forecasts');
const secureRoute   = require('../lib/secureRoute');
const upload = require('../lib/upload');
const oauth = require('../controllers/oauth');

router.route('/')
  .get(statics.index);

router.route('/dashboard')
  .get(secureRoute, statics.dashboard);

router.route('/faq')
  .get(secureRoute, statics.faq);


router.route('/probability')
  .get(forecasts.probability);

router.route('/forecasts')
  .get(secureRoute, forecasts.index);

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

router.route('/oauth/facebook')
  .get(oauth.facebook);

router.route('/logout')
  .get(sessions.delete);

router.route('/auroras/:id/comments')
  .post(secureRoute, auroras.createComment);

router.route('/auroras/:id/comments/:commentId')
  .delete(secureRoute, auroras.deleteComment);

router.route('/users/:id/places')
  .post(secureRoute, users.placesCreate);

router.route('/users/:id/places/:placeId')
  .delete(secureRoute, users.placesDelete);

router.get('/country', geonames.proxy);

router.all('*', (req, res) => res.notFound());

module.exports = router;
