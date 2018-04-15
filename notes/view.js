'use strict';

// VIEW -- user interactive
// responsible for
// -- rendering the content
// -- handling model and DOM events


// ==Creating Views
// Render the content
// Respond to DOM events(eg clicks, drag & drops, etc)
// More like Controllers in MVC
// Have a DOM element

var SongView = Backbone.View.extend({

  // 什么时候会执行 -- 需要你呼叫才会被执行
  // 'render' -- mean render to the screen!
  // 对了，不一定非得叫render，这个名字随意你去取
  // 但是by convention 都会取 'render'
  render: function() {
    this.$el.html('Hello World');

    // 为什么要return this?
    return this;
  }
});

/**
 * 每一个View 都对应着一个DOM element
 * 'el' --> 告诉backbone 这个VIEW是对应着哪个DOM element
 * '$el' --> jquery版本的el
 */

 var songView = new SongView({ el: '#container' });
 songView.render();


 // 考虑下面的情况，在你创建 view instance的时候没有指定某个DOM element
 var songView = new SongView();
 songView.render();

/**
 * 你在页面是是看不到信息的，但是
 * backbone 会创建这个dom element in memory (如果你没有指定tagName, 那么默认会是DIV)
 * 你需要把这个在内存里的element append/add 到页面的某个DOM下，例如
 */
$('#container').html( songView.$el );


// 指定这个view使用
// 哪个Tag
// 有哪些 classname
// id 是什么
// 有哪些 attributes
var SongView = Backbone.View.extend({
  tagName: 'span',
  className: 'song1 song2',
  id: '1235',
  attributes: {
    'data-genre': 'Jazz'
  },

  render: function() {
    this.$el.html( 'Hello World' );

    return this;
  }
});

/**
 * 前面我们提到每个 view 的 render() 都应该 --> return this
 * 主要是方便我们做chainning!!
 * 例如上面我们是这样：
 *   songView.render()
 *   $('#container').html( songView.$el )
 *
 * 如果我们有 "return this"，我们可以做chainning, 像这样：
 *   $('#container').html( songView.render().$el );
 */

/**
 * 我们可以在创建 view instance 的时候就指定这个View给已经存在在页面上的DOM element
 *
 * 我们也可以在创建 view instance 的时候不指定这个View给任何已经存在在页面上的DOM element
 * 让backbone创建这个dom element in memory, 最后我们在通过jquery把这个内存里面的DOM element
 * append/add 到某个已经存在在页面上的DOM element
 */


// ==Passing Data(Model) to Views
var Song = Backbone.Model.extend();
var SongView = Backbone.View.extend({
  render: function() {

    // this.$el.html('Hello World');
    /**
     * 上面是我们hard code
     * 现在在这个view里面可以访问到我们passed model attribute
     */
    this.$el.html( this.model.get('title') );

    return this;
  }
});

// create a model instance
var song = new Song({ title: 'Blue in Green' });

// create a view instance, and passing model to it!!
var songView = new SongView({ el: '#contaner', model: song });
songView.render();




// ==Passing Data(Collection) to Views
var Songs = Backbone.Collection.extend({
  model: Song
});

// create a collection
var songs = new Song([
  new Song({ title: 'song 1' }),
  new Song({ title: 'song 2' }),
  new Song({ title: 'song 3' })
]);

// you have SongsView
var SongsView = Backbone.View.extend({

  render: function() {
    var self = this;
    // why should cache 'self = this'?
    this.model.each(function(song) {
      var songView = new SongView({ model: song });
      self.$el.append(songView.render().$el);
    });
  }

});

// passing COLLECTION to VIEW
var songsView = new SongsView({ el: '#container', model: songs });
songsView.render();



// ==Handling DOM Events
var Song = Backbone.Model.extend();

var SongView = Backbone.View.extend({

  // events hash object
  events: {

    // 'event element': 'eventHandler'
    'click': 'onClick', // for generic purpose 点击任何地方
    'click .bookmark': 'onClickBookmark'

  },

  onClick: function() {
    console.log('Listen Clicked!');
  },

  onClickBookmark: function(e) {
    e.stopPropagation();

    console.log('Bookmark Clicked');
  },

  render: function() {
    this.$el.html(this.model.get('title') + ' <button>Listen</button> <button class="bookmark"></button>');

    return this;
  }
});

var song = new Song({ title: 'Blue in Green' });
var songView = new SongView({ el: '#container', model: song });
songView.render();



// ==Handling Model Events

/**
 * Real-time notifications
 *   - Polling(client keeps asking the server)
 *   - Pushing(server tells the client)
 */

var Song = Backbone.Model.extend({
  default: {
    listeners: 0
  }
});

var SongView = Backbone.View.extend({

  initialize: function() {
    // 监听 Model Event
    // this.model.on('event', callback, context);
    this.model.on('change', this.render, this);
    this.model.on('change', this.onModelChange, this);
  },

  onModelChange: function() {
    this.$el.addClass('some-Class');
  },

  render: function() {
    this.$el.html(this.model.get('title') + ' - Listeners: ' + this.model.get('listeners'));

    return this;
  }
});

var song = new Song({ title: 'Blue in Green' });
var songView = SongView({ el: '#container', model: song });
songView.render();



// ==Handling Collection Events
var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
  model: Song
});

var SongView = Backbone.View.extend({
  tagName: 'li',

  render: function() {
    this.$el.html( this.model.get('title') );

    // 下面我们remove model from collection
    // 的时候，我们不知道哪个model被移除了，所以这里我们给每个 song 一个id
    this.$el.attr('id', this.model.id); // 为什么这里用id,因为这个id是服务端给的注意可以保持和服务端一致

    return this;
  }
})

var SongsView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {

    // listen collection event
    // 注意这里的 this.model 是一个collection
    // 因为我们传入的是一个collection
    this.model.on('add', this.onSongAdded, this);

    // listen collection remove event
    this.model.on('remove', this.onSongRemoved, this);
  },

  onSongAdded: function() {
    var songView = new SongView({ model: song });
    this.$el.append( songView.render().$el );
  },

  onSongRemoved: function() {
    console.log('Song Removed!');
    this.$el.find('li#' + song.id).remove();
  },

  render: function() {
    var self = this;

    this.model.each(function(song) {
      var songView = new SongView({ model: song });
      self.$el.append( songView.render().$el );
    });
  }
});

var songs = new Song([
  new Song({ id: 1, title: 'Blue in Green'}),
  new Song({ id: 2, title: 'So What'}),
  new Song({ id: 3, title: 'Blue in Green'})
]);

var songsView = new SongsView({ el: '#songs', model: songs });
songsView.render();



// ==Templating
/**
 * UnderscoreJS
 * MustacheJS
 * HandleBarsJS
 */

var Song = Backbone.Model.extend();

var SongView = Backbone.Model.extend({

  render: function() {

    // 在这之前我们一直都是在render里面直接写我们的 markup
    // this.$el.html( this.model.get('title') + ' <button>Listen</button>');

    // 现在我们用我们在index.html里面定义好的 template
    var template = _.template( $('#songTemplate').html() ); // 1. 编译我们的 template
    var html = template( this.model.toJSON() ); // 2. 给我们 template 需要的值（放在Model.attributes)，填充好变量值
    this.$el.html(html); // 3. 把编译完填充好值的标签 append/add 到页面上


    return this;
  }
});

var song = new Song({ title: 'Blue in Green', plays: 1001 });
var songView = new SongView({ el: '#container', model: song });
songView.render();
