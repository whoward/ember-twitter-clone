import { autolink } from '../../../helpers/autolink';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Helper | autolink');

let subject = function(input) {
  return autolink([input]).toString();
};

test('it return an unedited string when there is nothing special to do', function(assert) {
  assert.equal(subject('Hello World'), 'Hello World');
});

test('it is HTML safe', function(assert) {
  assert.ok(autolink(['ok']) instanceof Ember.Handlebars.SafeString);
});

test('it escapes html from the text', function(assert) {
  let expected = '&lt;Hello World&gt;';
  let actual = subject('<Hello World>');
  assert.equal(actual, expected);
});

test('it replaces @handle with a link to the user', function(assert) {
  let expected = '<a href="/dhh">@dhh</a>';
  let actual = subject('@dhh');
  assert.equal(actual, expected);
});

test('it replaces multiple handles in the string', function(assert) {
  let expected = '<a href="/dhh">@dhh</a> hello <a href="/foo">@foo</a>';
  let actual = subject('@dhh hello @foo');
  assert.equal(actual, expected);
});


test("it doesn't replace handles that are preceeded by letters", function(assert) {
  let expected = 'foo@dhh';
  let actual = subject('foo@dhh');
  assert.equal(actual, expected);
});

test('it replaces #foo with the link to the hashtag', function(assert) {
  let expected = '<a href="/hashtag/winning">#winning</a>';
  let actual = subject('#winning');
  assert.equal(actual, expected);
});

test('it replaces multiple hashtags', function(assert) {
  let expected = '<a href="/hashtag/winning">#winning</a> <a href="/hashtag/eyeofthetiger">#eyeofthetiger</a>';
  let actual = subject('#winning #eyeofthetiger');
  assert.equal(actual, expected);
});

test("it doesn't replace hashtags that are preceeded by letters", function(assert) {
  let expected = 'foo#hash';
  let actual = subject('foo#hash');
  assert.equal(actual, expected);
});

test('it automatically links urls', function(assert) {
  let expected = ' <a href="http://www.google.ca/" target="_blank">http://www.google.ca/</a> ';
  let actual = subject('http://www.google.ca/');
  assert.equal(actual, expected);
});