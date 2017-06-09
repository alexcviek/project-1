function staticsIndex(req, res){
  res.render('statics/index');
}

function staticsDashboard(req, res){
  res.render('statics/dashboard');
}

module.exports = {
  index: staticsIndex,
  dashboard: staticsDashboard
};
