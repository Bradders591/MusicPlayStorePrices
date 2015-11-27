var request = require('request');
var cheerio = require('cheerio');


module.exports = {
  getSong: function(options, cb) {
    var returnArray = [];
    var artistWithPlus = options.artist.split(' ').join('+');
    var songWithPlus = options.song.split(' ').join('+');
    var url = 'https://play.google.com/store/search?q=';
    url += artistWithPlus;
    url += '+';
    url += songWithPlus;
    url += '&c=music';
    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        var topSongs = $('.title-link:contains("Songs")').closest('.cluster');
        var songDiv = topSongs.find('.card-list');
        songDiv.children().each(function(i, elm) {
          var coverURL = $(this).find('.cover-image').attr('src');
          var title = $(this).find('.title').text();
          var artist = $(this).find('.subtitle').text();
          var price = $(this).find('span.display-price').first().text();
          returnArray.push({'CoverArt': coverURL, 'title': title, 'artist': artist, 'price': price});
        });
        if(returnArray.length < 1) {
          cb('Nothing Found', null);
        } else {
          cb(null, returnArray);
        }
      }
      if(error) {
        console.log(error);
      }
    });
  }
};

	/*var url = 'https://play.google.com/store/search?q=riverman+noel+gallagher&c=music';
	request(url, function(error, response, html){
        if(!error){
        	var $ = cheerio.load(html);
        	console.log($('.title-link').text());

        	var topSongs = $('.title-link:contains("Songs")').closest('.cluster');
        	var songDiv = topSongs.find('.card-list');
        	console.log(songDiv);

        	songDiv.children().each(function(i, elm) {
			    var coverURL = $(this).find('.cover-image').attr('src');
			    var title = $(this).find('.title').text();
			    var artist = $(this).find('.subtitle').text();
			    var price = $(this).find('span.display-price').first().text();
			    console.log('coverURL: ' + coverURL);
			    console.log('title: ' + title);
			    console.log('artist: ' + artist);
			    console.log('price: ' + price);
			});
      	}
     });*/