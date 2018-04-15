// our view need some way to listen for once specify actions occur
// click
// doubleclick
// hover
// ...
(function() {

  window.App = {
    Models: {},
    Collections: {},
    Views: {}
  };

  window.template = function(id) {
    return _.template( $('#' + id).html() );
  };

  App.Models.Task = Backbone.Model.extend({});

  App.Collections.Tasks = Backbone.Collection.extend({
    model: App.Models.Task
  });

  App.Views.Tasks = Backbone.View.extend({
    tagName: 'ul',

    render: function() {
      this.collection.each(this.addOne, this);

      return this;
    },

    addOne: function(task) {
      // creating a new child view
      var taskView = new App.Views.Task({ model: task });
      // append to the root element
      this.$el.append(taskView.render().el);
    }
  })

  App.Views.Task = Backbone.View.extend({
    tagName: 'li',

    // using template
    template: template('taskTemplate'),

    // listen event use events object
    events: {
      // jquery you do like this
      // $('li').on('click', function() {...})

      // backbone
      // 'click': 'showAlert'

      // click li --> span
      // 'click span': 'showAlert'

      // behind the sence doesn't do like this: $('.edit') --> lots of dom search, search entril dom
      // it's do some kinds like this: this.$el.find('.edit') --> do not need search entril dom event time
      'click .edit': 'editTask'
    },

    editTask: function() {
      var newTaskTitle = prompt('What would you like to change the text to?', this.model.get('title'));

      // we need immediately update once user change
      this.model.set('title', newTaskTitle);
      // 这里我们是update了model
      // 但是我们需要在View里面来监听，当 model changed we need immediately re-render the view whenever changed!
    },

    showAlert: function() {
      alert('you clicked me!');
    },

    render: function() {
      // this.$el.html( this.model.get('title') );

      // 我们使用template
      var template = this.template( this.model.toJSON() );
      this.$el.html(template);

      return this;
    }
  });


  // var task = new App.Models.Task({
  //   title: 'Go to the store',
  //   priority: 4
  // });

  // var taskView = new App.Views.Task({ model: task });
  // console.log(taskView.render().el);

  var tasks = new App.Collections.Tasks([
    {
      title: 'Go to the store',
      priority: 4
    },
    {
      title: 'Go to the mall',
      priority: 3
    },
    {
      title: 'Go to the work',
      priority: 5
    }
  ]);

  var tasksView = new App.Views.Tasks({ collection: tasks });
  // tasksView.render();
  // console.log(tasksView.el);
  $(document.body).append(tasksView.render().el);

})();