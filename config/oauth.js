module.exports = {
  facebook: {
    loginUrl: 'https://www.facebook.com/v2.9/dialog/oauth',
    clientId: process.env.FACEBOOK_APP_ID,
    redirectUri: 'https://peaceful-peak-78688.herokuapp.com/oauth/facebook',
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    scope: 'email, user_hometown',
    accessTokenUrl: 'https://graph.facebook.com/v2.9/oauth/access_token',
    getLoginURL() {
      return `${this.loginUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    }
  }
};
