var API_KEY = '';
var IMAGE_TO_FIND = "";

var Filepicker = require('./filepicker.js');
var filepicker = new Filepicker(API_KEY);

//this pulls my tumblr picture and upload to filepicker
console.log("finding the image located at "+IMAGE_TO_FIND+" and uploading to filepicker");
filepicker.getUrlFromUrl(IMAGE_TO_FIND, {persist:true}, function(err, url) {
	if(err) 
		throw err;
	console.log("filepicker returned the following url:",url);
});