import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return {
      tag: params.tag,
      tweets: this.store.query('tweet', {hashtag: params.tag})
    };
  }
});
