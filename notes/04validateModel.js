var Person = Backbone.Model.extend({
  defaults: {
    name: 'John Doe',
    age: 30,
    occupation: 'worker'
  },

  // 什么时候、什么动作会触发?
  //  -- 早期的版本在你 set() 的时候就会自动触发
  //  -- 后面的版本你想 set() 的时候去验证需要你去传入 { validate: true } 参数
  //  -- 但使用 save() 的时候会自动触发
  // what is passing to? -- attributes object
  // 用toJSON() 返回的结果
  validate: function(attrs) {

    // 在这里我们可以对 property 进行验证
    // 但是如果没有通过验证，下面我们指定的返回信息不回返回，只会返回false
    // 那怎么得到我们指定的返回信息? -- listen 'invalid' event
    // 一但 invalid event trigger this property will not be set!
    if ( attrs.age < 0 ) {
      return 'Age must be positive, stupid.';
    }

    if ( !attrs.name ) {
      return 'Every person must have a name, fool.';
    }
  },

  work: function() {
    return this.get('name') + ' is working.';
  }
})

var person = new Person();

// listen invalid event -- 早期backbone监听的是 error event
person.on('invalid', function(model, error) {
  console.log(error);
})