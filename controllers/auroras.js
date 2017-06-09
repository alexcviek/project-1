const Aurora = require('../models/aurora');

function aurorasIndex(req, res, next){
  Aurora
  .find()
  .then((auroras) => res.render('auroras/index', { auroras }))
  .catch(next);
}

function aurorasNew(req, res){
  res.render('auroras/new');
}

function aurorasCreate(req, res, next){
  Aurora
  .create(req.body)
  .then(() => res.redirect('/auroras'))
  .catch(next);
}

function aurorasShow(req, res, next){
  Aurora
  .findById(req.params.id)
  .then((aurora) => {
    if(!aurora) return res.status(404).render('statics/404');
    res.render('auroras/show', { aurora });
  })
  .catch(next);
}

function aurorasEdit(req, res, next){
  Aurora
  .findById(req.params.id)
  .then((aurora) => {
    if(!aurora) return res.status(404).render('statics/404');
    res.render('auroras/edit', { aurora });
  })
  .catch(next);

}

function aurorasUpdate(req, res, next){
  Aurora
  .findById(req.params.id)
  .then((aurora) => {
    if(!aurora) return res.status(404).render('statics/404');
    for(const x in req.body) {
      aurora[x] = req.body[x];
    }
    return aurora.save();
  })
  .then((aurora) => res.redirect(`/auroras/${aurora.id}`))
  .catch(next);
}

function aurorasDelete(req, res, next){
  Aurora
  .findById(req.params.id)
  .then((aurora) => {
    if(!aurora) return res.status(404).render('statics/404');
    return aurora.remove();
  })
  .then(() => res.redirect('/auroras'))
  .catch(next);
}

// function aurorasDelete(req, res, next) {
//   Aurora
//   .findById(req.params.id)
//   .then((aurora) => {
//     if(!aurora) return res.status(404).render('statics/error');
//     return aurora.remove();
//   })
//   .then(() => res.redirect('/auroras'))
//   .catch(next);
// }


module.exports = {
  index: aurorasIndex,
  new: aurorasNew,
  create: aurorasCreate,
  show: aurorasShow,
  edit: aurorasEdit,
  update: aurorasUpdate,
  delete: aurorasDelete
};
