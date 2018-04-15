// 处理namespace有多种方式
// 最基本的就是把methods/attributes放到一个object里，再把这个object赋给一个全局变量
(function() {

  window.App = {};

  App.template = function() {
    return _.template( $('#' + id).html() );
  }

  // 或者你有多个helper function
  App.Helper = {};
  App.Helper.template = function() {}


  // 两种方法来define your Model, View, Collection ...
  // 一种是：(当你处理的是小型项目这种方式没有什么问题)
  App.Person = Backbone.Model.extend({});
  App.PersonView = Backbone.View.extend({});
  App.PeopleCollection = Backbone.Collection.extend({});

  // when you need create an instance
  var person = new App.Person();


  // 如果你的项目比较大的话，你可以这样
  window.App = {
    Models: {},
    Collections: {},
    Views: {}
  };

  // 同时建议你遵循一定的convention，例如：你处理的项目为 Appointment
  // Appointment
  // AppointmentView
  // AppointmentsCollection

  // App.Models.Appointment
  // App.Views.Appointment
  // App.Collections.Appointments
  //
  // 遵循一定规律的话，几个月回来看你的代码你也能很清晰的知道

})();


// 根据上面的convention来重新组织我们之前的代码

(function() {

  window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Helpers: {} // if you have lots of helper functions
  };

  window.template = function(id) {
    return _.template( $('#' + id).html() );
  };

  // Person Model
  App.Models.Person = Backbone.Model.extend({
    defaults: {
      name: 'John Doe',
      age: 30,
      occupation: 'worker'
    }
  });

  // A List of People
  App.Collections.PeopleCollection = Backbone.Collection.extend({
    model: App.Models.Person
  });

  // View for all people
  App.Veiws.People = Backbone.View.extend({
    tagName: 'ul',

    render: function() {
      this.collection.each(function(person) {
        var personView = new App.Views.PersonView({ model: person });
        this.$el.append(personView.render().el);
      }, this);

      return this;
    }
  });

  // The View for a Person
  App.Views.PersonView = Backbone.View.extend({
    tagName: 'li',

    render: function() {
      this.$el.html( this.template(this.model.toJSON()) );
      return this;
    }
  });

  var peopleCollection = new App.Collections.People([]);
  var peopleView = new App.Views.PeopleView({ collection: peopleCollection });
  $(document.body).append(peopleView.render().el);

})();