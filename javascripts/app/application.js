var root;

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.App = Em.Application.create();

App.ApplicationController = Em.ObjectController.extend();

App.ApplicationView = Em.View.extend({
  templateName: 'application',
  layoutName: 'layout'
});
