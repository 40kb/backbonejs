'use strict';

// Models
// Containers for application data
// Different from plain Javascript objects
// Models can Syncrhonization to server with RESTful API


// ==define/creating Models
// what .extend() do?
var Song = Backbone.Model.extend({

  // set default attributes
  default: {
    genre: 'Jazz'
  },

  // when initialize execute?
  // 在你创建 Model instance 的时候会被执行
  initialize: function() {
    console.log('A new song has been created.');
  }
});

// create an instance of Song Model
var song = new Song();


// ==Working with Attributes
// set attributes
// 你设置的这些属性存在哪里？
// 存在这个实例的 `attributes` hash object --> song.attributes
song.set('title', 'Blue in Green');
song.set({
  title: 'Blue in Green',
  artist: 'Miles Davis'
});

// get attributes
song.get('title');

// remove attributes
song.unset('title');

// remove all attributes
song.clear();

// check if container some attributes
song.has('title');

// set default attributes
// 在你 "Defaine Model" 的时候通过 `default` 属性来设定


// ==Validation
var Song = Backbone.Model.extend({

  // 什么时候会触发 `validate` -- use save() 会自动触发
  // 早期版本在你使用 .set() 的时候会触发，现在如果你想在使用
  // .set() 的时候要触发验证，你需要传入 { validate: true } option
  validate: function(attrs) {
    if (!attrs.title) {
      return 'Title is required';
    }

    if (attrs.age < 0) {
      return 'Age should be lager than 1, OK'
    }
  }
});

var song = new Song();

// check instance isValid()
song.isValid();

// 取回验证错误信息
song.validationError // 'Title is required'

// 早期版本在你使用 .set() 的时候会触发，现在如果你想在使用
// .set() 的时候要触发验证，你需要传入 { validate: true } option 例如：
song.set({
  title: 'Lorem ipsum dolor sit amet.',
  age: -8
}, { validate: true });

// 如果验证通过则值会被设置，不会返回任何东西
// 如果验证不通过值不会被设置，会返回 false
// 如果你想取回你定义的错误返回信息，可以通过访问 `validationError`
console.log( song.validationError );


// ==Inheritance
// `Model`可以让一个 Model 继承于另一个 Model! 例如： Dog 继承于 Animal
// because `Model` just JS object, and in Javascript, Object can inheritance
var Animal = Backbone.Model.extend({
  walk: function() {
    console.log('Animal Walking...');
  }
});

// 让 Dog 继承 Animal
var Dog = Animal.extend({});

var dog = new Dog();

// 这样我们能访问到 Animal 的 walk method
dog.walk(); // Animal Working...

// 如果是我们想override walk method怎么办
// 我们可以在 Dog Model里面定义自己的 walk method
var Dog = Animal.extend({
  walk: function() {
    // 为啥要加这行？
    Animal.prototype.walk.apply(this);

    console.log('Dog walking...');
  }
})


// ==Connecting to the Server
/**
 *              Client                      Server
 *  fetch() --> Model --> (jQuery AJAX) --> REST API
 *
 * fetch()    --http--> GET
 * save()     --http--> POST/PUT
 * destroy()  --http--> DELETE
 */

 // how Backbone know which url to GET/POST/PUT/DELETE
 var Song = Backbone.Model.extend({
    // 使用 urlRoot 来告诉Backbone你的Data放在Server哪个位置
    // 如果你的域名是：example.com
    // 那么下面的url就会是：example.com/api/songs
    urlRoot: '/api/songs'
 });


 // ===Fetching a Model
 var song = new Song({ id: 1 });
 song.fetch(); //=> GET /api/songs/1

 // ===Updating a Model
 var song = new Song({ id: 1 });
 song.fetch();

 song.set('title', 'newTitle');
 song.save(); //=> 因为这个song在服务端存在了，所以backbone会建立PUT请求

 // ===Inserting a Model
 var song = new Song();
 song.set('title', 'Title');
 song.save(); //=> 创建一个新的song存到服务器，backbone会建立POST请求

 // ===Deleting a Model
var song = new Song({ id: 1 });
song.destroy(); //=> DELETE /api/songs/1

// 注意：每个Model在服务端都有一个唯一的标识，传统上都为 `id`
// 如果这个唯一标识不是id的话，你可以通过 `idAttribute` 来告诉Backbone
// 使用哪个标识来做唯一标识！
// 例如：如果你用MongoDB那么，它用 `_id` 来标识一个Model的id
var Song = Backbone.Model.extend({
  idAttribute: '_id'
});
var song = new Song({ _id: 1 });

// ===Callback
// fetch()、save()、destroy() 都是通过 Async 的方式
// 他们都接受 'success' 和 'error' callback
var song = new Song();
song.fetch({
  success: function() {},
  error: function() {}
});

song.destroy({
  success: function() {},
  error: function() {}
});

// 但是注意，save() 有些区别，因为是POST/PUT请求
// 一般都会有数据要递交、更新所以他的 callback 长这样：
song.save({
  /**
   * 你要递交的数据
   * Hash of attributes to set and save
   */
  }, {
  success: function() {},
  error: function() {}
});

// Tips: 你可以用 set() 先设置好你的attributes
// 然后再用 save() 来同步到服务端，这样你在 save() 的时候第一个参数 `{}` 就可以留空！