import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('index', {path: '/'});
  this.route('user', {path: '/:handle'});
  this.route('hashtag', {path: '/hashtag/:tag'});
});

export default Router;
