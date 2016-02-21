import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'p',
  
  click(ev) {
    let href = $(ev.target).attr('href');
    
    // if this is an offsite link (not an absolute path) then allow the normal behavior 
    if(!href.startsWith('/')) { return; }
    
    ev.preventDefault();
    
    let router = Ember.getOwner(this).lookup('router:main');
    
    router.transitionTo(href);
  }
});
