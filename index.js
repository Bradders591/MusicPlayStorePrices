var request = require('request');
var cheerio = require('cheerio');


module.exports = {
  getSong: function(options, cb) {
    var returnArray = [];
    if(!options.artist || !options.song) {
      cb('Invalid Options', null);
      return;
    };
    var artistWithPlus = options.artist.split(' ').join('+');
    var songWithPlus = options.song.split(' ').join('+');
    var url = 'https://play.google.com/store/search?q=';
    url += artistWithPlus;
    url += '+';
    url += songWithPlus;
    url += '&c=music';
    sendRequest(url, 'Songs', cb);
  },
  getAlbum: function(options, cb) {
    if(!options.artist || !options.album) {
      cb('Invalid Options', null);
      return;
    };
    var artistWithPlus = options.artist.split(' ').join('+');
    var albumWithPlus = options.album.split(' ').join('+');
    var url = 'https://play.google.com/store/search?q=';
    url += artistWithPlus;
    url += '+';
    url += albumWithPlus;
    url += '&c=music';
    sendRequest(url, 'Albums', cb);
  }
};

var sendRequest = function(url, type, cb) {
  var returnArray = [];
  request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        var topSongs = $('.title-link:contains("' + type + '")').closest('.cluster');
        var songDiv = topSongs.find('.card-list');
        songDiv.children().each(function(i, elm) {
          var coverURL = $(this).find('.cover-image').attr('src');
          var title = $(this).find('.title').text();
          var link = $(this).find('.title').attr('href');
          var fullLink = 'https://play.google.com' + link;
          var artist = $(this).find('.subtitle').text();
          var price = $(this).find('span.display-price').first().text();
          returnArray.push({'CoverArt': coverURL, 'title': title, 'artist': artist, 'price': price, 'link': fullLink});
        });
        if(returnArray.length < 1) {
          cb('Nothing Found', null);
        } else {
          cb(null, returnArray);
        }
      }
      if(error) {
        cb(error, null);
      }
    });
}