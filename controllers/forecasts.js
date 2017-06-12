const rp = require('request-promise');

function forecastsIndex(req, res){
  res.render('forecasts/index');
}

function probabilityProxy(req, res) {
  rp({
    url: `http://api.auroras.live/v1/?type=all&lat=${req.query.lat}&long=${req.query.lng}&forecast=false&threeday=false`,
    method: 'GET',
    json: true
  })
  .then((forecast) => {
    res.json(forecast);
  });
}

module.exports = {
  index: forecastsIndex,
  probability: probabilityProxy
};
