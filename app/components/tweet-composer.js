import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  
  user: null,
  
  text: '',
  
  submitDisabled: function() {
    return this.get('text').length === 0;
  }.property('text'),
  
  remainingCounter: function() {
    return 140 - this.get('text').length;
  }.property('text'),
  
  remainingCounterClass: function() {
    let remaining = this.get('remainingCounter');
    
    if(remaining < 0) {
      return 'text-danger';
    } else if (remaining <= 20) {
      return 'text-warning';
    } else {
      return 'text-muted';
    }
  }.property('remainingCounter'),
  
  actions: {
    submit() {
      if(this.get('submitDisabled')) {
        return;
      }
      
      let record = this.get('store').createRecord('tweet', {
        text: this.get('text'),
        created_at: new Date()
      });
      
      this.set('text', '');
      
      record.save();
    }
  }
});
