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

  req.body.createdBy = req.user;

  Aurora
  .create(req.body)
  .then(() => res.redirect('/auroras'))
  .catch((err) => {
    if(err.name === 'ValidationError') return res.badRequest(`/auroras/new`, err.toString());
    next(err);
  });
}

function aurorasShow(req, res, next){
  Aurora
  .findById(req.params.id)
  .populate('createdBy comments.createdBy')
  .then((aurora) => {
    if(!aurora) return res.notFound();
    res.render('auroras/show', { aurora });
  })
  .catch(next);
}

function aurorasEdit(req, res, next){
  Aurora
  .findById(req.params.id)
  .then((aurora) => {
    if(!aurora) return res.redirect();
    if(!aurora.belongsTo(req.user)) return res.unauthorized(`/auroras/${aurora.id}`, 'You do not have permission to edit that resource');
    return res.render('auroras/edit', { aurora });
  })
  .catch(next);

}

function aurorasUpdate(req, res, next){
  Aurora
  .findById(req.params.id)
  .then((aurora) => {
    if(!aurora) return res.redirect();
    if(!aurora.belongsTo(req.user)) return res.unauthorized(`/auroras/${aurora.id}`, 'You do not have permission to edit that resource');

    for(const x in req.body) {
      aurora[x] = req.body[x];
    }

    return aurora.save();
  })
  .then(() => res.redirect(`/auroras/${req.params.id}`))
  .catch((err) => {
    if(err.name === 'ValidationError') return res.badRequest(`/auroras/${req.params.id}/edit`, err.toString());
    next(err);
  });
}

function aurorasDelete(req, res, next){
  Aurora
  .findById(req.params.id)
  .then((aurora) => {
    if(!aurora) return res.redirect();
    if(!aurora.belongsTo(req.user)) return res.unauthorized(`/auroras/${aurora.id}`, 'You do not have permission to edit that resource');
    return aurora.remove();
  })
  .then(() => res.redirect('/auroras'))
  .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Aurora
    .findById(req.params.id)
    .exec()
    .then((aurora) => {
      if(!aurora) return res.notFound();

      aurora.comments.push(req.body);
      return aurora.save();
    })
    .then((aurora) => res.redirect(`/auroras/${aurora.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Aurora
    .findById(req.params.id)
    .exec()
    .then((aurora) => {
      if(!aurora) return res.notFound();
      const comment = aurora.comments.id(req.params.commentId);
      comment.remove();

      return aurora.save();
    })
    .then((aurora) => res.redirect(`/auroras/${aurora.id}`))
    .catch(next);
}

module.exports = {
  index: aurorasIndex,
  new: aurorasNew,
  create: aurorasCreate,
  show: aurorasShow,
  edit: aurorasEdit,
  update: aurorasUpdate,
  delete: aurorasDelete,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
