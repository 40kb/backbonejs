// 前面我们知道怎么用pure JS 来 represent data

// 下面我们用backbone Model 来 represent data

// create a backbone Model by extend Backbone.Model
var Person = Backbone.Model.extend({});

// 把 Person 的 property 放进去
var Person = Backbone.Model.extend({

  // we set default by using 'defaults'
  defaults: {
    name: 'John Doe',
    age: 30,
    occupation: 'worker'
  }
})

// how we access these properties?
// 这些properties 放在哪里？ -- Person instance 里 attributes 下面!
var person = new Person();
person.name; // no

// we using helper method get(), set() ...
person.get('name');

// how about commonly data/properties (the property your put in 'prototype')
// 在你用pure JS 来 represent data 的时候，你放在prototype的一些properties
// 用backbone Model来 represent data的时候你就不需要放在 prototype 里了
var Person = Backbone.Model.extend({

  // we set default by using 'defaults'
  // 这些信息会放在 instance 的 attributes 属性下面
  defaults: {
    name: 'John Doe',
    age: 30,
    occupation: 'worker'
  },

  // 会放在 instance 的 __proto__(Backbone.Model) 属性里面
  work: function() {
    return this.get('name') + ' is working.';
  }
})

// how about your want to overwrite the default properties
var person = new Person({ name: 'wdraft', age: 26 });

// 你可以用 instance.toJSON() return a copy of attributes object
// 注意：虽然叫 toJSON 但是返回的并不是 JSON format data, is JS object
person.toJSON();

// 你怎么去update property
// 或者是add property to instance(person)
// using helper function set()
person.set('occupation', 'web developer');

// 如果你要update/add 多个properties，you can passing an object like this:
person.set({ name: 'byer', age: 16 });


// 但是这个时候你用 set() 把age 设置为负数的话
// 但是通常person 的age 是不为负数的，有什么办法能在保存服务器之前做验证(validation)
person.set( age: -50 );

// Model Validation