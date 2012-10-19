root = exports ? this
root.App = Em.Application.create()

# Controllers
App.ApplicationController = Em.ObjectController.extend()

# Views
App.ApplicationView = Em.View.extend
  templateName: 'application'
  layoutName: 'layout'

App.Router = Em.Router.extend
  enableLogging: true
  root: Em.Route.extend
    index: Em.Route.extend
      route: '/'

App.router = App.Router.create()

$ ->
  App.initialize(App.router)
