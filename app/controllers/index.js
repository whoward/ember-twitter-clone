import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  currentUser: Ember.computed.reads('applicationController.currentUser')
});