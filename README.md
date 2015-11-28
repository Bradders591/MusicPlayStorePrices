# MusicPlayStorePrices

A library to get play store prices for music as returned by their webpage

This project is not endorsed by or affiliated with Google in any way.

# Usage

## Download via npm

```javascript
npm install musicplaystoreprices
```

## Require Library

```javascript
var playSearch = require('musicplaystoreprices');
```

## Search For Song

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

## Search For Album

Using Node JS callback style:

```javascript

var options = {
	"artist": "Tremonti",
	"album": "Cauterize"
}
playSearch.getAlbum(options, function(err, data){
	// returns array of albums
});

```
