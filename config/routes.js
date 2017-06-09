const router = require('express').Router();

const statics = require('../controllers/statics');
const auroras = require('../controllers/auroras');


router.route('/')
  .get(statics.index);

router.route('/dashboard')
  .get(statics.dashboard);

router.route('/auroras')
  .get(auroras.index)
  .post(auroras.create);

router.route('/auroras/new')
  .get(auroras.new);

router.route('/auroras/:id')
  .get(auroras.show)
  .put(auroras.update)
  .delete(auroras.delete);

router.route('/auroras/:id/edit')
  .get(auroras.edit);

// app.get('/', (req, res) => res.render('statics/index'));
// app.get('/dashboard', (req, res) => res.render('statics/dashboard'));
module.exports = router;
