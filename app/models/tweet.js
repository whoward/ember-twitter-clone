import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  created_at: DS.attr('date'),
  retweets: DS.attr('number'),
  likes: DS.attr('number'),
  author: DS.belongsTo('user'),
  sharedBy: DS.belongsTo('user')
});
