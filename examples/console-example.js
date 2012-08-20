var API_KEY = '';
var IMAGE_TO_FIND = "https://a248.e.akamai.net/assets.github.com/images/modules/about_page/github_logo.png?1338945074";

var Filepicker = require('filepicker');
var filepicker = new Filepicker(API_KEY);

console.log("finding the image located at "+IMAGE_TO_FIND+" and uploading to filepicker");
filepicker.getUrlFromUrl(IMAGE_TO_FIND, {persist:true}, function(err, url) {
	if(err) 
		throw err;
	console.log("filepicker returned the following url:",url);
});