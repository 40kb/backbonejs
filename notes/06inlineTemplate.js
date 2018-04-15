var Person = Backbone.Model.extend({
  defaults: {
    name: 'John Doe',
    age: 30,
    occupation: 'worker'
  }
});

var PersonView = Backbone.View.extend({
  tagName: 'li',

  // 这里我们使用underscore提供的very simple template engine
  // 这里我们用 inline template 的方式
  template: _.template('<%= name %> (<%= age %>) - <%= occupation %>'),

  initialize: function() {
    console.log('now, you are create an instance');
    console.log(this.model);
  },

  render: function() {
    this.$el.html( this.model.get('name') );

    // 这里你会看到如果对于复杂的内容输出，你只是单纯的做字符拼接的话会造成你的代码超烂，而且不好维护 -- very bad idea!
    // 这个时候我们就需要用到 template engine 了!!
    // 我们使用underscore内建的template engine，同时这里用 inline template的形式
    //
    // template: _.template('<%= name %> (<%= age %>) - <%= occupation %>'),
    this.$el.html(this.model.get('name') + ' (' + this.model.get('age') + ') ' + '- ' + this.model.get('occupation'));

    // 下面我们使用 template engine 简化之后的方案 -- 更简洁更好维护
    this.$el.html( this.template(this.model.toJSON()) );

    // 对比一下可以看出，用template engine远远比简单的字符拼接来得简洁好维护!
    // 字符拼接成了 anti-pattern
  }
});

var person = new Person();

var personView = new PersonView({ model: person });

// 这里 'PersonView' represent a single person View -- a single li element!
// 当然一个 View 不仅限于一个 li，也可以是一块的内容，一个页面的内容都可以！

// 另外一个问题，现在表示的是 a single person
// 我们怎么去表示 a list of people?! -- 重复上面的操作，一个一个 person 来创建?
// 当然不是，这样显得太蠢了，可以使用 -- Collection

// 这里我们使用的 inline template，当然对于简单的输出是没有问题的，
// 但是如果li 里面包括了 div 里面再包括 a 在包括 img 这样复杂的话
// 你依旧使用 inline template 就显得太臃肿了！ -- 这个时候你应该使用 External template