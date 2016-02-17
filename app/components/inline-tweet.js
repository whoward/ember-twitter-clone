import Ember from 'ember';

export default Ember.Component.extend({
  onReply: Ember.K,
  
  actions: {
    userClickedReply() {
      this.get('onReply').call(this, this.get('tweet'));
    }
  }
});
