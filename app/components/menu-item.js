import Ember from 'ember';

export default Ember.LinkComponent.extend({
  tagName: 'li',
  
  // This is copied from the ember source code because it insists on not allowing the href if the tagName is not "a"
  realHref: function() {
    let qualifiedRouteName = this.get('qualifiedRouteName');
    let models = this.get('models');

    if (this.get('loading')) { return this.get('loadingHref'); }

    let routing = this.get('_routing');
    let queryParams = this.get('queryParams.values');
    return routing.generateURL(qualifiedRouteName, models, queryParams);
  }.property('models', 'qualifiedRouteName')
});
