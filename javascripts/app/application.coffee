root = exports ? this
root.App = Em.Application.create()

# Controllers
App.ApplicationController = Em.ObjectController.extend()

# Views
App.ApplicationView = Em.View.extend
  templateName: 'application'
  layoutName: 'layout'
