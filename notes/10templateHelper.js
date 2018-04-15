// 对于template通过什么方式来实现
//  -- inline
//  -- external (写在index.html里面，还是单独创建template.js)
// 都是根据不同情况而定，不过inline的方式的话，最好尽量不要用，除非你的template是很短，20-30个字符
// 一般都建议使用 external 的方式，至于写在index.html里面还是单独创建文件这个根据项目而定

// 你可以创建一个 templateHelper function help your clean up your code
var template = function(id) {
  return $('#' + id).html();
}

// your code will cleanner
var PersonView = Backbone.View.extend({
  template: _.template( template('singlePersonTemplate') )
  // ...
  // ...
});

// 当然你可以在templateHelper function 里直接compile your template
var template = function(id) {
  return _.template( $('#' + id).html() );
}

// 这样你的code会更简洁
var PersonView = Backbone.View.extend({
  template: template('singlePersonTemplate')
  // ...
  // ...
});

// 哪种方式更适合你的项目，或你更喜欢哪种方式，你来定

// 对了，如果你有多个template 还是建议你创建一个templateHelper function,
// 这样不需要做重复的动作， DRY
