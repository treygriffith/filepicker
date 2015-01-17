// Node.js based filepicker library, only supports getUrlFromData for now, and a new getUrlFromUrl and getUrlFromBuffer methods
// Based on the javascript client library at http://api.filepicker.io/v0/filepicker.js

var request = require('request');

var BASE_URL="https://www.filepicker.io";
var endpoints = {};
endpoints.tempStorage = BASE_URL+"/api/path/storage/";

function Filepicker(apiKey) {
	this.apiKey = apiKey;
	return this;
}

// ## Filepicker#getUrlFromData
// Store data in filepicker.

// ### Arguments
//	* fileContents - String contents to store. These should not be Base64 encoded unless the `noencode` parameter is set to true
//	* options - Object of filepicker options, such as `persist`
//	* callback - Function to evaluate after the request has completed
//	* noencode - Boolean indicating whether the `fileContents` are already Base64 encoded. Defaults to false.

// ### Callback Arguments
// 1. Error or exception encountered while uploading
// 2. URL of stored filepicker file
// 3. JSON representation of the complete response from Filepicker


Filepicker.prototype.getUrlFromData = function(fileContents, options, callback, noencode){
	if(typeof options === "function") {
		noencode = !!callback;
		callback = options;
		options = {};
	} else {
		noencode = !!noencode;
	}
	if(!options) {
		options = {};
	}
	if(!options.filename) {
		options.filename = '';
	}
	callback = callback || function(){};
	if(!fileContents) {
		callback(new Error('Error: no contents given'));
		return;
	}
	var returnData;
	fileContents = noencode ? fileContents : Base64.encode(fileContents);
	request({
		method: 'POST',
		headers: {Accept: 'application/json'},
		url: endpoints.tempStorage + options.filename,
		form: {
			fileContents: fileContents,
			apikey: this.apiKey,
			persist: !!options.persist
		}
	}, function(err, res, body) {
		if(err) {
			callback(err);
			return;
		}
		var returnJson;
		try {
			returnJson = JSON.parse(body);
		} catch(e) {
			callback(new Error('Unknown response'), null, body);
			return;
		}

		if(returnJson.result == 'ok') {
			returnData = returnJson.data;
			callback(null, returnData.url, returnData.data);
		} else if(returnJson.result == 'error') {
			callback(new Error(returnJson.msg));
		} else {
			callback(new Error('Unknown response'), null, returnJson);
		}
	});
};

// ## Filepicker#getUrlFromBuffer
// Store data in the form of a Buffer in Filepicker.

// ### Arguments
//	* buf - Buffer to store
//	* options - Object of filepicker options, such as `persist`
//	* callback - Function to evaluate after the request has completed

// ### Callback Arguments
// 1. Error or exception encountered while uploading
// 2. URL of stored filepicker file
// 3. JSON representation of the complete response from Filepicker

Filepicker.prototype.getUrlFromBuffer = function(buf, options, callback) {
	if(typeof options === 'function') {
		callback = options;
		options = {};
	}
	if(!buf || !(buf instanceof Buffer)) {
		callback(new Error('Error: must use a Buffer'));
		return;
	}
	this.getUrlFromData(buf.toString('base64'), options, callback, true);
};

// ## Filepicker#getUrlFromUrl
// Store data found at a particular URL on Filepicker

// ### Arguments
//	* url - String location of data to store on filepicker
//	* options - Object of filepicker options, such as `persist`
//	* callback - Function to evaluate after the request has completed

// ### Callback Arguments
// 1. Error or exception encountered while uploading
// 2. URL of stored filepicker file
// 3. JSON representation of the complete response from Filepicker

Filepicker.prototype.getUrlFromUrl = function(url, options, callback) {
	var self = this;
	if(typeof options === 'function') {
		callback = options;
		options = {};
	}
	if(!url) {
		callback(new Error('Error: no url given'));
		return;
	}
	request({
		url:url,
		encoding:null
		},
		function(err, res, buf) {
		if(err || !buf) {
			callback(err);
			return;
		}
		self.getUrlFromBuffer(buf, options, callback, true);
	});
};

module.exports = Filepicker;
