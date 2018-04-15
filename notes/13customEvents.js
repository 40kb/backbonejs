(function() {

  window.App = {
    Models: {},
    Collections: {},
    Views: {}
  };

  window.template = function(id) {
    return _.template( $('#' + id).html() );
  };

  App.Models.Task = Backbone.Model.extend({
    validate: function(attrs) {
      if ( ! $.trim(attrs.title) ) {
        return 'A task requires a valid title.';
      }
    }
  });

  App.Collections.Tasks = Backbone.Collection.extend({
    model: App.Models.Task
  });

  App.Views.Tasks = Backbone.View.extend({
    tagName: 'ul',

    initialize: function() {
      this.collection.on('add', this.addOne, this);

      // 注意!!
      // this.collection.on('add', this.render, this);
      // 注意，这里如果你没有把addOne和render分离，就会遇到一种情况
      // 就是说，如果你把addOne和render混在一起的话，你每一次添加model
      // 到collection里面，都有做一次each() filter every one,
      // 当你的collection有几百条model的话，你就懵B了 -- 很没有性能
    },

    render: function() {
      this.collection.each(this.addOne, this);

      return this;
    },

    addOne: function(task) {
      var taskView = new App.Views.Task({ model: task });
      this.$el.append(taskView.render().el);
    }
  })

  App.Views.Task = Backbone.View.extend({
    tagName: 'li',

    template: template('taskTemplate'),

    // set our custon listener here listen for model change
    initialize: function() {

      // this.model.on('change', cb, this) --> remember to set context
      // this.model.on('change:attr', cb, this) --> remember to set context
      this.model.on('change:title', this.render, this)

      // 如果你不想set context
      // 你可以用下面的方式: --> all methods execute the context will be this View
      // _.bindAll(this, 'editTask', 'render');

      // listen destroy
      this.model.on('destroy', this.remove, this);
    },

    events: {
      'click .edit': 'editTask',
      'click .delete': 'destroy'
    },

    editTask: function() {
      var newTaskTitle = prompt('What would you like to change the text to?', this.model.get('title'));

      // if user clicked 'Cancle'
      // 另一种方式是通过Model里'validate' method
      if ( !newTaskTitle ) return;

      this.model.set('title', newTaskTitle, {validate: true});
    },

    destroy: function() {
      this.model.destroy();
    },

    remove: function() {
      this.$el.remove();
    },

    showAlert: function() {
      alert('you clicked me!');
    },

    render: function() {
      var template = this.template( this.model.toJSON() );
      this.$el.html(template);

      return this;
    }
  });


  // we need add task to collection
  // 注意，我们也要监听collection 发生变化然后re-render
  App.Views.AddTask = Backbone.View.extend({
    // 我们可以用
    // tagName: 'li'
    //
    // 我们可以用template
    // template: template('templateName')
    //
    // 我们也可以用已经存在页面上的element
    el: '#addTask',

    initialize: function() {
      console.log(this.el.innerHTML);
    },

    events: {
      'submit': 'submit'
    },

    submit: function(e) {
      e.preventDefault();

      var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();

      // and than we need create TaskView
      var task = new App.Models.Task({ title: newTaskTitle });

      // we need to add this model to the collection
      // （在collection View里需要监听collection add 把新添加进来的render出来添加到现有的list里面）
      this.collection.add(task);
    }
  });

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

  // 注意，这里需要实例化一个addTaskView
  var addTaskView = new App.Views.AddTask({ collection: tasks });

  var tasksView = new App.Views.Tasks({ collection: tasks });
  $(document.body).append(tasksView.render().el);

})();