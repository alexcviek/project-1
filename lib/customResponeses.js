function customResponses(req, res, next) {
  res.notFound = function notFound() {
    const err = new Error('Not Found');
    err.status = 404;

    throw err;
  };

  res.badRequest = function badRequest(url, errors) {
    req.flash('alert', errors);
    return res.redirect(url);
  };

  res.unauthorized = function unauthorized(url='/login', message='You must be logged in') {
    req.flash('alert', message);
    return res.redirect(url);
  };

  next();
}

module.exports = customResponses;
