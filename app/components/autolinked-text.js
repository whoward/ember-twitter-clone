/* global $ */
import Ember from 'ember';
import linkify from 'ember-linkify/helpers/linkify';

const handle = /@\w+/;
const hashtag = /#\w+/;

let linkInternal = function(text, pattern, urlGenerator) {
  // replace pattern matches at the beginning of the string
  text = text.replace(new RegExp(`^(${pattern})`), function(match) {
    return `<a href="${urlGenerator(match)}">${match}</a>`;
  });
  
  // replace pattern matches in the middle of the string preceeded by a whitespace 
  text = text.replace(new RegExp(`(\\s+)(${pattern})`, 'g'), function(string, pre, match) {
    return `${pre}<a href="${urlGenerator(match)}">${match}</a>`;
  });
  
  return text;
};

export default Ember.Component.extend({
  tagName: 'p',
  
  router: function() {
    return Ember.getOwner(this).lookup('router:main');
  }.property(),
  
  linkedText: function() {
    let text = this.get('text');
    let router = this.get('router');
    
    // pass it through ember-linkify to HTML escape the text and do basic autolinking
    text = linkify.compute([text], '_blank').toString();
    
    // create links for handles in the text
    text = linkInternal(text, handle.source, function(handle) {
      return router.generate('user', handle.slice(1));
    });
    
    // create links for hashtags in the text
    text = linkInternal(text, hashtag.source, function(hashtag) {
      return router.generate('hashtag', hashtag.slice(1));
    });
    
    return new Ember.String.htmlSafe(text);
  }.property('text'),
  
  click(ev) {
    let href = $(ev.target).attr('href');
    let text = $(ev.target).text().trim();
    let router = this.get('router');
    
    // ignore elements without an href 
    if(!href) { return; }
    
    if(handle.exec(text)) {
      ev.preventDefault();
      router.transitionTo('user', text.slice(1));
    } else if (hashtag.exec(text)) {
      ev.preventDefault();
      router.transitionTo('hashtag', text.slice(1));
    }
  }
});
