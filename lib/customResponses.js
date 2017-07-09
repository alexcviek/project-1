function customResponses(req, res, next) {
  res.notFound = function notFound() {
    const err = new Error('Not Found');
    err.status = 404;

    throw err;
  };

  res.badRequest = function badRequest(url, errors) {
    req.flash('danger', errors);
    return res.redirect(url);
  };

  res.unauthorized = function unauthorized(url='/', message='You must be logged in') {
    req.flash('danger', message);
    return res.redirect(url);
  };

  next();
}

module.exports = customResponses;
