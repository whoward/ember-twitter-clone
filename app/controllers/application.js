
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  
  currentUser: function() {
    if (this.get('session.isAuthenticated')) {
      return this.store.find('user', 'current');
    }
  }.property('session.isAuthenticated'),
  
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});