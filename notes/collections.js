'use strict';

// Collections
// a list of "ordered" Models
// 注意collection是有顺序的！


// ==Creaging Collections
var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
  model: Song
});

// adding model to collection
var songs = new Songs([
    new Song({ title: 'song1' }),
    new Song({ title: 'song2' }),
    new Song({ title: 'song3' }),
  ]);

var songs.add(new Song({ title: 'song 4' }));

// accessing model in collection by index
songs.at(0);

/**
 * 每个 Backbone Model 都会有两个id
 * 一个是 `id` proivde by server for presisten
 * 另一个是 `cid` provide by backbone, Model在创建的时候backbone就会给它一个cid
 */

 // accessing model in collection by using cid/id
 songs.get('c1');

 // remove model from collection
 songs.remove( songs.at(0) );


 // ==Working with Collections
 // underscore.js 提供的一些常用的methods用在collections上面

// adding model to the beginning of collection
songs.add(new Song({ title: 'song 1' }), { at: 0 });

// 你也可以用 push()
song.push(new Song({ title: 'song 2' }));

/**
 * by default add() 和 push() 是一样的功能
 * 但是add()你可以通过 {at: 'index'} 指定让model添加到哪个index下
 * push() 总是添加到 top of stack（collection的最后面）
 */

 // search model in a collection
 // 提供了两个方式：where() findWhere()
 // where() -- return an Array of all matched
 // findWhere() -- return the first matched!
 var jazzSongs = songs.where({ genre: 'Jazz' });
 var firstJazzSong = songs.findWhere({ genre: 'Jazz' });

 // 我们可以通过 where() 来做 filter
 var filteredSongs = songs.where({ genre: 'Jazz', title: 'song 2' });

 // 当然也可以用 filter() method 来做筛选
 // 例如：你想取回下载量大于100的歌曲
var topDownloads = songs.filter(function(song) {
  return song.get('downloads') > 100;
});

/**
 * 注意：filter(callback)
 * filter 的 callback 只会返回 true/false
 * 如果是 true 就把它丢到返回的 Array
 * 如果是 false 则跳过进行下一个
 */

// loop through each model in collection
songs.each(function(song) {
  console.log(song);
});


// ==Connecting to the server
// 我们已经知道Model persisting 是通过指定 `urlRoot`
// 而 Collection persisting 通过指定 `url`
// 注意：你在做collection persisting的时候 model 就不在需要
// 添加`urlRoot`了，因为backbone发现你Model里面没有指定 urlRoot
// 就会用collection 里面的 `url`
var Songs = Backbone.Collection.extend({
  model: Song,

  // where collection exist in the server
  url: '/api/songs'
});

var songs = new Songs();
songs.fetch(); //=> GET /api/songs

// 带参数的 fetch()
songs.fetch({
  data: {
    page: 2
  },
  success: function() {},
  error: function() {}
}); // GET /api/songs?page=2