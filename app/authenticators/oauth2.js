// app/authenticators/oauth2.js
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'ember-twitter/config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${ENV.apiHost}/token`
});