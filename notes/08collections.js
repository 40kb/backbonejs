// Person Model
var Person = Backbone.Model.extend({
  defaults: {
    name: 'John Doe',
    age: 30,
    occupation: 'worker'
  }
});

// A List of People
var PersonCollection = Backbone.Collection.extend({
  // Collection 需要知道你存放的是哪种类型的 Model
  model: Person
});

// The View of People
var PersonView = Backbone.View.extend({
  tagName: 'li',

  template: _.template( $('#personTemplate').html() ),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );
  }
});

// 创建一个 person instance
var person = new Person();

// 创建一个 collection instance
var peopleCollection = new PersonCollection();

// 把某个实例（person instance) 添加到这个 collection 里
peopleCollection.add( person );

// 添加另外一个 collection item
// step1: 你先要有一个和这个collection指定存放的 Model 是 instance
var person2 = new Person({ name: 'jeff' });
// step2: (然后你得有一个collection instance，没有就得创建一个)然后通过collection.add(model instance)添加进来
peopleCollection.add( person2 );

/**
 * base steps:
 * your create a model
 * and then you create the collection
 * and then you add the model to the collection
 */

 // 还有另外的办法（也可以同时一次添加多个model)
//  peopleCollection.add([
//   {model}, // 当你添加一个object的时候，Backbone会把你添加的model和这个Collection存放的Model type关联起来
//   {model},
//   {model}
// ])
peopleCollection.add([
  {
    name: 'jeff',
    age: 30
  },
  {
    name: 'jame',
    age: 18
  }
]);

// how to access the first collection item? -- use at(index)
var d = peopleCollection.at( 0 );
// 这样你取回第一个collection item，它是一个Model你可以做Model可以做的任何事情

// 注意Collection里面的 model: Person 是一个pointer (object by reference)
// 当你去改变 Person Model 的时候，这个Collection里面的Model也会跟着update


// 到目前为止，we have single person
// we have single person view
// we have collection
// BUT we don't have collection view
// coming next...

