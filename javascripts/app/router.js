
App.Router = Em.Router.extend({
  enableLogging: true,
  root: Em.Route.extend({
    showPriorWorks: Em.Route.transitionTo('priorWorks'),
    index: Em.Route.extend({
      route: '/'
    }),
    priorWorks: Em.Route.extend({
      route: '/priorWorks',
      connectOutlets: function(r) {
        return r.get("applicationController").connectOutlet('priorWorks', []);
      }
    })
  })
});

App.router = App.Router.create();

$(function() {
  return App.initialize(App.router);
});
