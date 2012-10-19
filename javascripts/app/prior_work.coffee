# Models
App.PriorWork = Em.Object.extend
  title: null
  description: null

# Controllers
App.PriorWorksController = Em.ArrayController.extend
  content: [App.PriorWork.create title: "Test", description: "BLALALA"]

App.PriorWorkController = Em.ObjectController.extend()

# Views
App.PriorWorksView = Em.View.extend
  templateName: 'priorWorks'

App.PriorWorkView = Em.View.extend
  templateName: 'priorWork'
