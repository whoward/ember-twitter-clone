import Ember from 'ember';

export function autolink([text]) {
  text = Ember.Handlebars.Utils.escapeExpression(text);
  
  text = text.replace(/(\s)(@\w+)/g, function(match, pre, handle) {
    return `${pre}<a href="/${handle.slice(1)}">${handle}</a>`;
  }).replace(/^(@\w+)/g, function(handle) {
    return `<a href="/${handle.slice(1)}">${handle}</a>`;
  }).replace(/(\s)(#\w+)/g, function(match, pre, handle) {
    return `${pre}<a href="/hashtag/${handle.slice(1)}">${handle}</a>`;
  }).replace(/^(#\w+)/, function(handle) {
    return `<a href="/hashtag/${handle.slice(1)}">${handle}</a>`;
  });
  
  return new Ember.String.htmlSafe(text);
}

export default Ember.Helper.helper(autolink);
