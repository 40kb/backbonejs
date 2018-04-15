var Person = Backbone.Model.extend({
  defaults: {
    name: 'John Doe',
    age: 30,
    occupation: 'worker'
  }
});

// View -- think of represention of a singel element
var PersonView = Backbone.View.extend({});

// see what we get -- el, $el, cid, __proto__(Backbone.View)
var personView = new PersonView({});

// by default tag name will be 'DIV'
// if you want to overwrite use 'tagName' attribute
var PersonView = Backbone.View.extend({
  tagName: 'li',

  // give a class
  className: 'class1 class2',

  // give an id
  id: 'some-person'
});

// 有些情况会是，你想每一次创建一个instance 的时候都想去执行某些东西
// backbone 提供了 'initialize' attriute
var PersonView = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    console.log('now, you are create an instance');
    console.log(this.model);
  },

  // what 'render' does!? -- take the value if Model and fill up the View
  // and remember you need to run this method! -- 不会自动运行
  // 你会看到有些人喜欢在 initialize 里面直接运行 render(), 这个就完全取决于你的项目了
  //
  // 还有注意的是 render 这个名字不是必须的，你可以叫你喜欢的任何名字，但是by conversion 都会叫 render
  // 而且你执行render() 之后，这个element还是存在内存里面，你需要把它append/add到页面上!
  render: function() {
    this.$el.html( this.model.get('name') );

    // 这里你会看到如果对于复杂的内容输出，你只是单纯的做字符拼接的话会造成你的代码超烂，而且不好维护 -- very bad idea!
    // 这个时候我们就需要用到 template engine 了!!
    this.$el.html( this.model.get('name') + ' (' + this.model.get('age') + ') ' + '- ' + this.model.get('occupation') );
  }
});

// 上面的 Model, View 是独立分开的
// 我怎么怎么让View accessing our Model? -- just passing model to view

// 所以你要先创建一个Model
var person = new Person();

// 然后你创建一个View, 同时把上面你创建的Model pass to View
// 这样的话，你在这个View 就可以访问到你传给它的 Model
var personView = new PersonView({ model: person });