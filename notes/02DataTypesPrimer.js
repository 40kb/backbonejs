// how to describe/organize/represent your data
// how to define your data
// like a Quiz

// by using pure javascript
var Quiz = function(title) {
  this.title = title;
};

// create a new Quiz
var d = new Quiz('apiDoc');

// like a Person
var Person = function(name, age, occupation) {
  this.name = name;
  this.age = age;
  this.occupation = occupation;
};

// but too many variables
// how about passing a object
var Person = function(config) {
  this.name = config.name;
  this.age = config.age;
  this.occupation = config.occupation;
}

// person shold walk/talk, so
var Person = function(config) {
  this.name = config.name;
  this.age = config.age;
  this.occupation = config.occupation;

  this.work = function() {
    return this.name + ' is working';
  }
}

// 但是 walk/talk 这些动作是common work
// 是些几乎每个person都能做的东西(每个object, 都包含的property)
// 像这类的property在每个perons都保留了一份就没多大意义了，很占用内存空间
// 我们把它放在prototype (all person/instance will share this method)
Person.prototype.work = function() {
  return this.name + ' is working.';
}

// 上面的 `Quiz` `Person` 代表的是一个 "Model"

// 上面是我们怎么用pure js来represent data
// 下面我们看看backbone提供了什么来represent data
// 怎么用backbone来represent data