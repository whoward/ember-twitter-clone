import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return {
      user: this.store.findRecord('user', params.handle),
      tweets: this.store.query('tweet', {user: params.handle})
    };
  }
});
