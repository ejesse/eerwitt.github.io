App.Router = Em.Router.extend
  enableLogging: true
  root: Em.Route.extend
    showPriorWorks: Em.Route.transitionTo('priorWorks')
    index: Em.Route.extend
      route: '/'
    priorWorks: Em.Route.extend
      route: '/priorWorks'
      connectOutlets: (r) ->
        r.get("applicationController").connectOutlet('priorWorks', [])


App.router = App.Router.create()

$ ->
  App.initialize(App.router)
