import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['tweet', 'well'],
  
  onReply: Ember.K,
  
  reply: true,
  
  actions: {
    userClickedReply() {
      this.get('onReply').call(this, this.get('tweet'));
    }
  }
});
