const Aurora = require('../models/aurora');

function staticsIndex(req, res){
  res.render('statics/index');
}

function staticsDashboard(req, res, next){
  Aurora
  .find()
  .then((auroras) => res.render('statics/dashboard', { auroras }))
  .catch(next);
}

// function staticsDashboard(req, res){
//   res.render('statics/dashboard');
// }

module.exports = {
  index: staticsIndex,
  dashboard: staticsDashboard
};
