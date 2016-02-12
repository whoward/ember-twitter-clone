import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('feed', {path: '/'});
  this.route('my_tweets', {path: '/profile'});
  this.route('user', {path: '/:handle'});
});

export default Router;
