/**
  External template

  在你的HTML里面有下面的代码：

  为什么要写 text/template
  因为浏览读到它的时候 知道它不是 HTML 也不是 JavaScript
  所以就会跳过不去解析它!

  <script id="personTemplate" type="text/template">
    <strong><%= name %></strong> (<%= age %>) - <%= occupation %>
  </script>
 */

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

  // 下面我们使用 external template 的方式
  // 这里我们 把template 和 我们的View 分开，可以让代码更简洁更好维护
  // 不会出现太多HTML和JS混在一起，特别是在你的template 比较复杂的时候，效果会更明显
  template: _.template( $('#personTemplate').html() ),

  // -- #2
  // external template 的另外一种处理方式是
  // template attribute 只是单纯的给它相对于template 的ID
  // 解析动作在 render() 里面去做
  template: '#personTemplate',

  initialize: function() {
    console.log('now, you are create an instance');
    console.log(this.model);
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );

    // parse template goes here
    // 对应上面的第二种处理external template 的方式! -- @#2
    // 至于选择哪一种根据你个人喜好了
    var template = _.template( $(this.template) );
    this.$el.html(template);

  }
});

var person = new Person();
var personView = new PersonView({ model: person });

// OK 目前为止我们都只是创建一个person
// 现在我们来创建第二个person
var person2 = new Person({ name: 'Jeff', age: 27 });
var personView2 = new PersonView({ model: person2 });

// 然后你把这两个 person add/append 到页面的上的时候
$(document.body).append(personView.el);
$(document.body).append(personView2.el);

// 至于如果你有很多个person 的话操作起来就显得很笨了
// 当然我们可以创建一个array来存放
// 但是array没有backbone 提供的 Collection 灵活
// Collection 可以监听 add/remove 等事件，也可以监听到 Model 改变的事件
var persons = [personView, personView2];