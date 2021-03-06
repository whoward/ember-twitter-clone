import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return {
      user: this.store.findRecord('user', params.handle),
      tweets: this.store.query('tweet', {user: params.handle})
    };
  }
});
