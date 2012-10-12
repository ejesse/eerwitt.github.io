var root;

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.App = Em.Application.create();

App.ApplicationController = Em.ObjectController.extend();

App.ApplicationView = Em.View.extend({
  templateName: 'application',
  layoutName: 'layout'
});

App.Router = Em.Router.extend({
  enableLogging: true,
  root: Em.Route.extend({
    index: Em.Route.extend({
      route: '/'
    })
  })
});

App.router = App.Router.create();

$(function() {
  return App.initialize(App.router);
});
