const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');

function facebook(req, res, next) {
  return rp({
    method: 'GET',
    url: oauth.facebook.accessTokenUrl,
    qs: {
      client_id: oauth.facebook.clientId,
      redirect_uri: oauth.facebook.redirectUri,
      client_secret: oauth.facebook.clientSecret,
      code: req.query.code
    },
    json: true
  })
  .then((token) => {
    return rp({
      method: 'GET',
      url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture.height(300)',
      qs: token,
      json: true
    });
  })
  .then((profile) => {
    console.log(profile);
    return User.findOne({$or: [{facebookId: profile.id }, { email: profile.email }]})
    .then((user) => {
      if(!user){
        user = new User({
          username: profile.name,
          email: profile.email
        });
      }
      user.facebookId = profile.id;
      user.image = profile.picture.data.url;
      return user.save();
    });
  })
  .then((user) => {
    req.session.userId = user.id;
    req.session.isLoggedIn = true;
    req.flash('success', `Welcome back, ${user.username}!`);
    res.redirect('/dashboard');
  })
  .catch(next);
}

module.exports = {
  facebook
};
