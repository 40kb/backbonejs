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
  model: Person
});

// View for all people
var PeopleView = Backbone.View.extend({
  tagName: 'ul',

  render: function() {
    // filter through all items in a collection
    // (要做filter,我们要访问到collection对不对, 所以我们创建这个view instance的时候把collection传进来)

    // 很多人在做filter的时候会直接使用underscore：_.each(this.collection, fn())
    // 或者使用jquery的方式：$.each(this.collection, fn())
    // 但是，Backbone在创建Collection的时候已经把很多underscore的method添加到Collection里了，其中就包括_.each()

    this.collection.each(function(person) {
      // for each, create a new PersonView
      var personView = new PersonView({ model: person });

      // append to root element
      // this.$el.append(personView.el);
      this.$el.append(personView.render().el);


      // 这里有一个问题，上面我们能得到结果是因为 'PersonView' 中存在下面的语句：
      // initialize: function() {this.render()}
      // 但是我们为什么要在initialize里面做？你当然不需要，但是这样的话你就需要在创建personView之后来手动render()
      // var personView = new PersonView({ model: person });
      // personView.render();
      // 这样的话也麻烦，有没有更好地办法？有的，就是在render()里面添加 --> 'return this' 来实现 chaining
      // render: function() {
      //  this.$el.html( this.template(this.model.toJSON()) );
      //  return this; <-- 这句很重要，来让render()之后可以chaining
      // }
      // 这样的话你就可以：
      // var personView = new PersonView({ model: person });
      // this.$el.append(personView.render().el);


    }, this);
    // 注意在上面里面each()的callback function里 this --> window object
    // 而我们这个callback function的外边 this --> 指向的是当前这个View
    // 所以我们需要指定这个callback function 中 this 的指向
    // 让它指向这个View，幸运的是underscore中 _.each() 提供了我们传入 context 的参数，如：
    // 这个callback function 后面传入的 'this'

    // 1. filter through all items in a collection
    // 2. for each, create a new PersonView
    // 3. append to root element


    return this;
  }
})

// The View of People
var PersonView = Backbone.View.extend({
  tagName: 'li',

  template: _.template( $('#personTemplate').html() ),

  // initialize: function() {
  //   this.render();
  // },

  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );

    return this; // 实现chaining, and good pattern is ALWAY return this in your render method
  }
});

var peopleCollection = new PersonCollection();

var person = new Person();
peopleCollection.add( person );

var person2 = new Person({ name: 'jeff' });
peopleCollection.add( person2 );

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


// we need to create a view response to render all peoples in collection
// also called COLLECTION VIEW


// create a peoples view
var peopleView = new PeopleView({ collection: peopleCollection });