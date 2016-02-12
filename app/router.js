import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('feed', {path: '/'});
  this.route('my_tweets', {path: '/profile'});
});

export default Router;
