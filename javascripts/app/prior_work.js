
App.PriorWork = Em.Object.extend({
  title: null,
  description: null
});

App.PriorWorksController = Em.ArrayController.extend({
  content: [
    App.PriorWork.create({
      title: "Test",
      description: "BLALALA"
    })
  ]
});

App.PriorWorkController = Em.ObjectController.extend();

App.PriorWorksView = Em.View.extend({
  templateName: 'priorWorks'
});

App.PriorWorkView = Em.View.extend({
  templateName: 'priorWork'
});
