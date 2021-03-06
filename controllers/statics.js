const Aurora = require('../models/aurora');
const oauth = require('../config/oauth');

function staticsIndex(req, res){
  res.render('statics/index', { oauth });
}

function staticsFaq(req, res){
  res.render('statics/faq');
}

function staticsDashboard(req, res, next){
  Aurora
  .find()
  .then((auroras) => res.render('statics/dashboard', { auroras }))
  .catch(next);
}


module.exports = {
  index: staticsIndex,
  faq: staticsFaq,
  dashboard: staticsDashboard
};
