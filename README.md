# MusicPlayStorePrices

A library to get play store prices for music as returned by their webpage

This project is not endorsed by of affiliated with Google in any way.

## Usage

Require Library

```javascript
var playSearch = require('MusicPlayStorePrices');
```


Search For Song

Using Node JS callback style:

```javascript

var options = {
	"artist": "Tremonti",
	"song": "Cauterize"
}
playSearch.getSong(options, function(err, data){
	// returns array of songs
});

```


