import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  currentUser: Ember.computed.reads('applicationController.currentUser'),
  
  sortOrder: ['created_at:desc'],
  sortedList: Ember.computed.sort('model', 'sortOrder'),
  
  newTweetText: '',
  
  scroller: Ember.inject.service(),
  
  actions: {
    userClickedReply(tweet) {
      this.set('newTweetText', `@${tweet.get('author.handle')} `);
      this.get('scroller').scrollVertical('body', {duration: 500});
    }
  }
});