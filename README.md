Filepicker Server-side Library
==============================

The fantastic folks at [Filepicker.io](http://filepicker.io) have a service that allows for easy storage of files, primarily on the client-side. There may, however, be instances in which you want to put photos from the server-side into your Filepicker bucket.

That's where this library comes in. Modified from the client library maintained by the Filepicker staff, this server-side library simply makes RESTy requests.

Installation
-------------

Through [NPM](http://www.npmjs.org)
``` bash
$ npm install filepicker
```

 or using Git
``` bash
$ git clone git://github.com/filepicker/cellar.git node_modules/filepicker/
```

API/How to Use
-----------

This library only implements one of the methods from the client library (getUrlFromData) as well as two methods more suited to a Node environment


#### Instantiation

``` javascript
var Filepicker = require('filepicker');
var filepicker = new Filepicker('YOUR_API_KEY');
```

#### Methods

1. `getUrlFromData`
	* A direct translation from the client library, stores contents of a file

	``` javascript
	filepicker.getUrlFromData("some text to store", {persist:true}, function(err, url) {
		console.log("my file is stored at "+url);
	});
	```

2. `getUrlFromUrl`
	* Makes a request to the specified location, and stores the data found there on Filepicker

	``` javascript
	filepicker.getUrlFromUrl('http://example.com/mypic.jpg', {persist:true}, function(err, url) {
		console.log("the picture at http://example.com/mypic.jpg is now stored at "+url);
	});

3. `getUrlFromBuffer`
	* Stores a Buffer on Filepicker

	```javascript
	fs.readFile('/myfile.txt', function(err, buf) {
		filepicker.getUrlFromBuffer(buf, {persist:true}, function(err, url) {
			console.log("myfile.txt is now stored at "+url);
		});
	})