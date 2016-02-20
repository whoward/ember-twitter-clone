import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  handle: DS.attr('string'),
  'avatar-url': DS.attr('string'),
  tweets: DS.hasMany('tweet', { inverse: 'author' })
});
