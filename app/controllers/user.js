import Ember from 'ember';

export default Ember.Controller.extend({
  sortOrder: ['created_at:desc'],
  sortedTweets: Ember.computed.sort('model.tweets', 'sortOrder')
});